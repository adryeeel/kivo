#!/usr/bin/env bash
# Build a service image from the working tree, run it, and report its health.
#
# usage: docker-test.sh [service] [port]   (defaults: web 3131)
#
# Needs existing Docker access; does not change machine permissions.
set -euo pipefail

SERVICE=${1:-web}
PORT=${2:-3131}
cd "$(dirname "$0")/../../../.."
RUN_DIR=$(mktemp -d -t project-docker-test.XXXXXXXX)
RUN_ID=${RUN_DIR##*.}
IMAGE="project-$SERVICE:test-$RUN_ID"
NAME="project-$SERVICE-test-$RUN_ID"
IMAGE_ID=
CONTAINER_ID=

cleanup() {
    [ ! -s "$RUN_DIR/container-id" ] || CONTAINER_ID=$(cat "$RUN_DIR/container-id")
    [ ! -s "$RUN_DIR/image-id" ] || IMAGE_ID=$(cat "$RUN_DIR/image-id")
    if [ -n "$CONTAINER_ID" ]; then
        docker rm -f "$CONTAINER_ID" >/dev/null 2>&1 || true
    fi
    if [ -n "$IMAGE_ID" ]; then
        docker image rm "$IMAGE" >/dev/null 2>&1 || true
    fi
    rm -rf "$RUN_DIR"
}
trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM

echo "== build (local image, no remote cache)"
DOCKER_BUILDKIT=1 docker build -q -f "apps/$SERVICE/Dockerfile" \
    --iidfile "$RUN_DIR/image-id" -t "$IMAGE" . || { echo "BUILD FAILED"; exit 1; }
IMAGE_ID=$(cat "$RUN_DIR/image-id")

echo "== runtime user"
docker run --rm --entrypoint sh "$IMAGE" -c id

echo "== health"
docker create --cidfile "$RUN_DIR/container-id" --name "$NAME" -p "127.0.0.1:$PORT:3000" "$IMAGE" >/dev/null
CONTAINER_ID=$(cat "$RUN_DIR/container-id")
docker start "$CONTAINER_ID" >/dev/null
status=none
for i in $(seq 1 12); do
    sleep 5
    status=$(docker inspect --format '{{if .State.Health}}{{.State.Health.Status}}{{else}}no-healthcheck{{end}}' "$CONTAINER_ID")
    echo "t=$((i * 5))s $status"
    [ "$status" = healthy ] || [ "$status" = no-healthcheck ] && break
done
curl --fail --max-time 10 -s -o /dev/null -w "GET / -> %{http_code}\n" "http://127.0.0.1:$PORT/"

[ "$status" = healthy ] || { echo "NOT HEALTHY"; docker logs --tail 20 "$CONTAINER_ID"; exit 1; }
