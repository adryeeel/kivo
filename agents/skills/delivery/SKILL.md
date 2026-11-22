---
name: delivery
description: Change, debug or verify repository CI/CD, Docker packaging, task caching and hooks. Select local validation and read-only run inspection first; deployment and rollback require authorization for those actions.
---

# Verify delivery changes

Read [Delivery](../../../docs/delivery/README.md), [Pipeline changes](../../../docs/delivery/changes.md) and relevant [decisions](../../../docs/decisions/README.md). Identify whether the task affects selection, hashes, output, packaging, credentials or live operation.

Choose verification from the pipeline guide, cheapest first: YAML/action syntax, representative path selection, clean Turbo inputs, image smoke checks, Compose/hooks, or read-only run inspection. Read helper requirements and cleanup behavior before execution. Inspect selected tasks and outputs, not only exit codes; report missing tools instead of changing machine permissions.

For existing failures, inspect the requested revision's relevant job logs with host tools or `gh run view`. Separate environment errors, cache behavior and source regressions using evidence.

Deployment, rollback, workflow dispatch, secret changes and production negative tests require authorization for that action and target. Reuse existing authorization. Confirm revision/environment before acting and check health afterward; local verification is not live success.

Use host event-driven monitoring when required; children return pending status. Report changed behavior, checked revision, commands/results and unverified levels. Update owned docs or send required corrections to their owner. Git operations use [commit](../commit/SKILL.md) and [pull-request](../pull-request/SKILL.md).
