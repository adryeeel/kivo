# Review

Review the intended behavior and connected code at the assigned base/head or explicit working-tree scope. Every PR receives review before readiness. Prefer an independent reviewer when available and authorized; that reviewer is read-only and the author resolves findings. Otherwise, the author performs a focused self-review and discloses that independent review was unavailable. A review requested without a PR can use the supplied goal and diff.

## Select the scope

| Changed area                                       | Reference and evidence                                                                                         |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Application or shared code                         | [Code](code.md), [Architecture](../architecture/README.md), affected callers                                   |
| UI, copy or tokens                                 | [Brand](../design/brand.md), accepted brief, relevant [design guides](../design/README.md), rendered evidence  |
| Tests or tested behavior                           | [Testing](../testing/README.md), actual contracts and fixtures                                                 |
| Client work, dependencies, canvas, fonts or images | [Performance patterns](../performance/patterns.md), measurements when warranted                                |
| Workflows, Docker or task caching                  | [Delivery](../delivery/README.md), applicable local validation                                                 |
| Markdown or instructions                           | [Documentation](documentation.md), links, source facts and [instruction evaluation](../agents/instructions.md) |

Skip unrelated areas. A Markdown-only cleanup needs reference and factual checks, not application browser tests. Inspect renamed paths across the repository. Check package boundaries and delivery filters when they are affected.

Use the [docs skill](../../agents/skills/docs/SKILL.md) for changed guidance, including roles and skills. Report its ownership, focus, accuracy and navigation findings alongside mechanical results; formatting and valid links alone are insufficient. A single reviewer can cover this without a separate documentation agent.

Reuse checks covering the current revision; run targeted read-only checks for gaps. Do not install tools, benchmark, deploy or publish issues as a review side effect. Report a missing optional skill only when it leaves a material gap. Apply available specialist review skills when appropriate to the assignment.

For UI, current layouts can change for a task-based reason; identity, accessibility and engineering boundaries remain constraints. Source inspection alone does not verify visual quality or keyboard behavior.

For a planned demand, check the assigned slice against its acceptance and recorded evidence. Confirm discoveries have a disposition and an invalidated slice is reopened; do not infer completion from a merged PR alone.

## Report findings

Each finding states priority, `path:line`, the failing scenario, evidence and smallest correction. Separate introduced defects, documentation mismatches, optional improvements and pre-existing out-of-scope problems. A preference or rule citation without a concrete consequence is not a blocker.

State the inspected revision/snapshot, checks and limits. Conclude with material findings or no verified findings; do not manufacture objections. After fixes, inspect the changed result rather than treating an earlier review as evidence for it. The lead owns acceptance and any authorized external tracking.
