#!/usr/bin/env bash
set -eu
for name in DEPLOY_PATH DEPLOY_PROJECT SSH_HOST SSH_KEY SSH_FINGERPRINT SSH_USERNAME REGISTRY_USER REGISTRY_TOKEN; do
    if [ -z "${!name}" ]; then
        echo "Missing deployment setting: $name" >&2
        exit 1
    fi
done
case "$DEPLOY_PATH" in
    /*) ;;
    *) echo "DEPLOY_PATH must be absolute" >&2; exit 1 ;;
esac
if [[ ! "$DEPLOY_PROJECT" =~ ^[a-z0-9][a-z0-9_-]*$ ]]; then
    echo "Invalid DEPLOY_PROJECT" >&2
    exit 1
fi
current=$(gh api "repos/$GITHUB_REPOSITORY/git/ref/heads/master" --jq '.object.sha')
if [ "$current" != "$SHA" ]; then
    echo "Skipping stale revision: master has advanced"
    exit 1
fi
