---
name: refactor-plan
description: Turn an agreed refactor goal and repository evidence into an executable migration plan with contracts, dependencies, ownership and verification. Use for substantial changes crossing modules or packages; small edits do not need this workflow.
---

# Plan a refactor

Read [Architecture](../../../docs/architecture/README.md), relevant [decisions](../../../docs/decisions/README.md) and affected consumers. Follow [ownership rules](../../../docs/agents/README.md). Inputs are the goal, behavior baseline, evidence and constraints.

Define outcome, preserved behavior and non-goals. Inventory callers, source data, generated artifacts and deployment consumers before moving files. Specify public contracts: shape, errors, identity, URLs, dependencies, environment and ownership, with an example across each changed boundary.

Sequence reviewable slices with result, writable paths/owner, prerequisites, consumer updates, checks and completion criterion. Hand the plan to the lead for the [demand record](../../../docs/contributing/demand-planning.md); do not create an issue per slice. Say which can ship independently. Shared configuration needs one owner; parallel work must not depend on unfinished APIs or overlap writers.

Place experiments before work depending on unproven behavior. Cover development invalidation, clean builds and packaging when affected, alongside semantic tests and integrated QA. Include reversible checkpoints for risky cutovers and removal of obsolete code/references/docs.

Respond to material critique with evidence, a plan change or an explicit tradeoff. Return the ordered plan, acceptance evidence and remaining blockers/dependencies. Stop at planning when assigned; do not implement or publish merely because the plan names those actions.
