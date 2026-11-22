#!/usr/bin/env bash
# Build apps/web, serve the production build and run mobile Lighthouse against it.
#
# usage: bench.sh <label> [out-dir] [runs]
#   label    names the reports (e.g. master, branch)
#   out-dir  where reports go (default: $TMPDIR or /tmp)
#   runs     simulated passes (default: 3), followed by one DevTools-throttled pass
#
# Set PROJECT_ROOT to benchmark another checkout (e.g. a master worktree); it defaults
# to the workspace this script lives in.
# Set BENCH_PORT to use another free loopback port (default: 3130).
#
# Set CPU_SLOWDOWN (e.g. 10) to reproduce PageSpeed's slow lab CPU: every pass then
# uses DevTools throttling at that CPU multiplier, and the extra DevTools pass is skipped.
#
# Prints one line per pass. Reports land in <out-dir>/lh-<label>-<n>.json and
# <out-dir>/lh-<label>-devtools.json.
set -euo pipefail

LABEL=${1:?usage: bench.sh <label> [out-dir] [runs]}
OUT=${2:-${TMPDIR:-/tmp}}
RUNS=${3:-3}
PORT=${BENCH_PORT:-3130}
ROOT=${PROJECT_ROOT:-$(cd "$(dirname "$0")/../../../.." && pwd -P)}
WEB="$ROOT/apps/web"

mkdir -p "$OUT"

CHROME_PATH=${CHROME_PATH:-$(ls -d ~/.cache/ms-playwright/chromium-*/chrome-linux*/chrome 2>/dev/null | tail -1 || true)}
[ -x "$CHROME_PATH" ] || { echo "No Playwright Chromium: pnpm --filter web exec playwright install chromium" >&2; exit 1; }
export CHROME_PATH

source "$(dirname "$0")/serve-prod.sh"
trap serve_prod_stop EXIT
trap 'exit 130' INT
trap 'exit 143' TERM
echo "building $LABEL…" >&2
serve_prod_start "$WEB" "$PORT" "$OUT/start-$LABEL.log" 1 "$OUT/build-$LABEL.log" >/dev/null
serve_prod_wait "$PORT" 30

summary() {
    node -e '
        const r = require(process.argv[1]), A = r.audits, v = (id) => A[id]?.displayValue ?? "-";
        console.log([
            process.argv[2].padEnd(22),
            "perf", Math.round(r.categories.performance.score * 100),
            "FCP", v("first-contentful-paint"),
            "(observed", Math.round(A.metrics.details.items[0].observedFirstContentfulPaint) + "ms)",
            "LCP", v("largest-contentful-paint"),
            "TBT", v("total-blocking-time"),
            "SI", v("speed-index"),
            "CLS", v("cumulative-layout-shift"),
            "|", v("total-byte-weight").replace("Total size was ", ""),
            "| unused JS", v("unused-javascript").replace("Est savings of ", ""),
        ].join(" "));
    ' "$1" "$2"
}

lighthouse() {
    npx -y lighthouse@12.8.2 "http://localhost:$PORT" --form-factor=mobile \
        --only-categories=performance --output=json --output-path="$1" \
        --chrome-flags="--headless=new --no-sandbox" --quiet "${@:2}" >/dev/null 2>&1
}

if [ -n "${CPU_SLOWDOWN:-}" ]; then
    for n in $(seq 1 "$RUNS"); do
        lighthouse "$OUT/lh-$LABEL-cpu$CPU_SLOWDOWN-$n.json" --throttling-method=devtools \
            --throttling.cpuSlowdownMultiplier="$CPU_SLOWDOWN"
        summary "$OUT/lh-$LABEL-cpu$CPU_SLOWDOWN-$n.json" "$LABEL #$n cpu ${CPU_SLOWDOWN}x"
    done
    exit 0
fi

for n in $(seq 1 "$RUNS"); do
    lighthouse "$OUT/lh-$LABEL-$n.json"
    summary "$OUT/lh-$LABEL-$n.json" "$LABEL #$n simulated"
done

lighthouse "$OUT/lh-$LABEL-devtools.json" --throttling-method=devtools
summary "$OUT/lh-$LABEL-devtools.json" "$LABEL devtools"
