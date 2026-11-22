set -eu
cd "$DEPLOY_PATH"
export IMAGE_REF DEPLOY_PROJECT
export COMPOSE_PROJECT_NAME="$DEPLOY_PROJECT"
export DOCKER_CONFIG="$(mktemp -d)"
trap 'rm -rf "$DOCKER_CONFIG"' EXIT
printf '%s' "$REGISTRY_TOKEN" | docker login ghcr.io --username "$REGISTRY_USER" --password-stdin
docker compose -f compose.production.yml pull
docker compose -f compose.production.yml up -d --wait --remove-orphans
