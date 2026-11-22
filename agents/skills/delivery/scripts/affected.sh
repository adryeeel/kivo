#!/usr/bin/env bash
# Inspect `turbo run … --affected` for past commits, in a clean worktree.
#
# usage: affected.sh [ref] [commit ...]
#   ref      config to test (default: HEAD; commit your turbo.json change first)
#   commit   commits to replay against their parent (default: last 8 on origin/master)
#
# A dirty working tree counts as changed files, and an uncommitted turbo.json change
# marks every task affected, so this always runs from a throwaway worktree.
set -euo pipefail

ROOT=$(cd "$(dirname "$0")/../../../.." && pwd -P)
GIT_ROOT=$(git -C "$ROOT" rev-parse --show-toplevel)
WORKSPACE=${ROOT#"$GIT_ROOT"}
REF=${1:-HEAD}
shift || true
COMMITS=("$@")
[ ${#COMMITS[@]} -gt 0 ] || mapfile -t COMMITS < <(git -C "$ROOT" log --format=%h -8 origin/master)

TURBO=$(readlink -f "$ROOT/node_modules/.bin/turbo")
WT=$(mktemp -d)
trap 'git -C "$GIT_ROOT" worktree remove --force "$WT" >/dev/null 2>&1 || true' EXIT
git -C "$GIT_ROOT" worktree add -q --detach "$WT" "$REF"

cd "$WT$WORKSPACE"
for c in "${COMMITS[@]}"; do
    subject=$(git log -1 --format=%s "$c")
    tasks=$(TURBO_SCM_BASE="$c^" TURBO_SCM_HEAD="$c" "$TURBO" run build test:check lint:check fmt:check \
        --affected --dry=json 2>/dev/null |
        node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{
            const j=JSON.parse(s.slice(s.indexOf("{")));
            console.log(j.tasks.map(t=>t.taskId).sort().join(" ")||"(none)")})')
    printf '%s  %s\n    %s\n' "$c" "${subject:0:60}" "$tasks"
done
