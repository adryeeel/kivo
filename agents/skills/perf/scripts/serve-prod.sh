#!/usr/bin/env bash
# Build apps/web and serve the production build, waiting until it responds.
#
# As a CLI: serve-prod.sh <port> [web-dir] [--no-build]
#   Builds (unless --no-build), starts `next start -p <port>` in the
#   background, waits until it responds, prints "ready pid=<pid> port=<port>",
#   and exits leaving the server running — stop that PID with `kill <pid>` when done.
#
# As a library (source it): serve_prod_start <web-dir> <port> <log-file> [build=1] [build-log=log-file]
# Call directly (not in command substitution): sets SERVE_PROD_PID and echoes it.
# serve_prod_wait <port> [timeout=30] [pid=$SERVE_PROD_PID] checks that process and HTTP readiness.
# serve_prod_stop stops only SERVE_PROD_PID.

serve_prod_check_port() {
    node - "$1" <<'NODE'
const net = require('node:net');
const port = Number(process.argv[2]);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
    console.error('Port must be an integer between 1 and 65535');
    process.exit(1);
}
const server = net.createServer();
server.once('error', (error) => {
    console.error(`Cannot use port ${port}: ${error.message}`);
    process.exitCode = 1;
});
server.listen(port, '127.0.0.1', () => server.close());
NODE
}

serve_prod_start() {
    local web=$1 port=$2 log=$3 build=${4:-1} build_log=${5:-$3}
    local next

    serve_prod_check_port "$port" || return 1

    if [ "$build" = "1" ]; then
        if ! (cd "$web" && pnpm build) >>"$build_log" 2>&1; then
            echo "Build failed — see $build_log" >&2
            return 1
        fi
    fi

    next=$(cd "$web" && node -p "require.resolve('next/dist/bin/next')") || return 1
    serve_prod_check_port "$port" || return 1
    (cd "$web" && exec node "$next" start -p "$port" -H 127.0.0.1) >>"$log" 2>&1 &
    SERVE_PROD_PID=$!
    echo "$SERVE_PROD_PID"
}

serve_prod_wait() {
    local port=$1 timeout=${2:-30} pid=${3:-${SERVE_PROD_PID:-}} code

    [ -n "$pid" ] || { echo "No owned server PID supplied" >&2; return 1; }

    for _ in $(seq 1 "$timeout"); do
        kill -0 "$pid" 2>/dev/null || return 1
        code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 2 "http://127.0.0.1:$port") || code=000
        if [[ "$code" == 2?? ]]; then
            kill -0 "$pid" 2>/dev/null && return 0
            return 1
        fi
        sleep 1
    done

    return 1
}

serve_prod_stop() {
    if [ -n "${SERVE_PROD_PID:-}" ]; then
        kill "$SERVE_PROD_PID" 2>/dev/null || true
        wait "$SERVE_PROD_PID" 2>/dev/null || true
        unset SERVE_PROD_PID
    fi
}

if [ "${BASH_SOURCE[0]}" = "$0" ]; then
    set -euo pipefail

    PORT=${1:?usage: serve-prod.sh <port> [web-dir] [--no-build]}
    WEB=${2:-$(cd "$(dirname "$0")/../../../.." && pwd -P)/apps/web}

    BUILD=1
    [ "${3:-}" = "--no-build" ] && BUILD=0

    LOG=$(mktemp -t serve-prod.XXXXXX.log)
    trap serve_prod_stop EXIT
    trap 'exit 130' INT
    trap 'exit 143' TERM
    echo "building and starting on :$PORT (log: $LOG)…" >&2
    serve_prod_start "$WEB" "$PORT" "$LOG" "$BUILD" >/dev/null

    if serve_prod_wait "$PORT"; then
        echo "ready pid=$SERVE_PROD_PID port=$PORT"
        trap - EXIT
    else
        echo "never responded on :$PORT — see $LOG" >&2
        exit 1
    fi
fi
