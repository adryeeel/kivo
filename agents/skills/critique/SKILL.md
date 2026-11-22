---
name: critique
description: Challenge a proposed design, implementation plan, agent brief or skill against its intended purpose and constraints. Use for independent evaluation before adoption; code review of an implemented diff follows the reviewer role and repository review standards.
---

# Critique a proposal

Inputs are the user's goal, proposal, relevant evidence and constraints. Inspect underlying code/tools when a claim depends on them. Separate requirements from suggestions.

Find concrete failures: missing contracts, dependency cycles, unowned steps, unverifiable assumptions, behavioral regressions or unnecessary operational cost. Compare the simplest viable alternative. A preference without task impact is not a blocker.

For roles/skills, use [instruction evaluation](../../../docs/agents/instructions.md): test purpose, inputs, permitted actions, output and stopping condition. Realistic disposable tasks are stronger evidence than frontmatter or prescribed wording. Request another evaluator through the lead only when independently assigned evaluation needs one.

Return priority, exact location/decision, failing scenario, evidence and smallest correction/test for each finding. Identify assumptions that could invalidate it; distinguish material objections, refinements and open questions. Report no material objections when supported.

Keep proposals, source and external services read-only unless editing is explicitly assigned. Rechecks inspect the revision and new risks without reopening resolved preferences. Stop when the assignment is evaluated; the lead owns acceptance and tradeoffs.
