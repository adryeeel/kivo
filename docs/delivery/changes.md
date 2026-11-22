# Change the pipeline

Read [CI](ci.md), [CD](cd.md) and [Operations](operations.md) before changing their configuration. Keep package versions aligned, frozen dependency installation, secret exclusion from images, an unprivileged runtime and container health checking.

Parse changed YAML and use actionlint when available. Verify the root scripts and selected Turbo tasks, rather than treating setup/cache output as application evidence. Task-input changes need an uncached check of the affected behavior. Changes to global preferences must invalidate the web build.

`agents/skills/delivery/scripts/affected.sh` inspects task selection in disposable worktrees of committed revisions. Read its requirements and cleanup before running it. `docker-test.sh` builds an owned test image, verifies the user/health/HTTP response and removes owned resources. A successful Next build cannot replace that packaging check.

Check Compose with dummy preferences in disposable resources. Hook checks must preserve the real index. Remote workflow inspection is read-only unless the user has authorized dispatch or other changes. Report local validation separately from live operation.
