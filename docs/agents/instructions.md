# Maintain agent instructions

## Keep layers separate

| Layer               | Owns                                                           |
| ------------------- | -------------------------------------------------------------- |
| `AGENTS.md`         | Repository entry point and task routing                        |
| `docs/`             | Repository facts, standards and durable decisions              |
| `agents/roles/`     | Role responsibility, inputs, allowed writes and deliverable    |
| `agents/skills/`    | Reusable task procedure and completion conditions              |
| Active runtime/user | Tools, model availability, permission and delegation authority |

Link to shared facts instead of repeating them. Read only applicable skills. A trigger is not permission for every operation mentioned in a procedure. User authorization persists; do not add approval rounds for routine work already in scope.

Use [docs](../../agents/skills/docs/SKILL.md) when changing guidance in any of these layers. The existing reviewer applies it to documentation; another role is not required. Editorial checks live in [Documentation conventions](../quality/documentation.md#validation), so the skill and role route to those checks rather than owning parallel standards.

## Retain improvements from delivery

Use findings from the [completion assessment](README.md#completion-assessment), as well as failures noticed during execution, to identify an improvement. Separate a product defect from missing or conflicting guidance, unavailable tooling and failure to follow an existing rule. A product fix alone does not require a new instruction. Use the [docs skill](../../agents/skills/docs/SKILL.md) to prepare a warranted guidance change.

Accepted improvements belong in the canonical layer above, tracked in Git and reviewed through [Review](../quality/review.md). Evidence and unaccepted proposals belong in the task report or an authorized issue/PR. Future sessions inherit integrated guidance from their checkout; temporary session context is not a second source of repository rules.

Changing instructions does not expand the task's authorization, weaken acceptance or replace unavailable verification with a claim of success. Continue routine work within the existing scope; an independent improvement outside it stays a proposal. External actions follow [Contributing](../contributing/README.md).

## Evaluate behavior

For a material instruction change, use representative tasks and disposable artifacts. Check purpose, inputs, permitted actions, output and stopping condition. Overlapping ownership, fabricated capabilities, hidden external actions and universal checklists unrelated to the task are defects.

Try a normal case, a boundary case and a case where the instruction should do less. For example: a planner should identify a missing contract; a docs reviewer should follow a renamed link without demanding browser tests; a test-only engineer should report a production bug without editing outside scope. Inspect the actual response/artifact, not prescribed wording or frontmatter alone.

When independent evaluation is assigned, give the evaluator the task and evidence without the expected finding. Record revision, result and limitations in the task report or PR. Do not launch extra evaluators merely to approve a minor reference update.

When evaluating retained improvements, include a fresh-session task that needs the lesson and a task where no instruction change is needed. Keep the intended diagnosis out of the assignment. Assess the actual result, scope and stopping behavior; distinguish successful task execution from evidence that the new guidance caused it. If an improvement regresses behavior, revise or revert it and rerun affected evaluation.
