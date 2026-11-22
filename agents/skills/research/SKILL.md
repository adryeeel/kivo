---
name: research
description: Investigate a repository design question or technical uncertainty using source inspection, primary documentation and bounded experiments. Use for evidence gathering before a decision, not as permission to implement or publish findings.
---

# Research a technical question

Inputs are the decision, repository revision, constraints and permitted experiment resources. Read relevant implementation and [decisions](../../../docs/decisions/README.md) first; identify which facts could change the recommendation.

Trace callers, data, exports, build configuration and production consumers. Separate current behavior from proposed architecture. Reuse evidence when its revision and limits still apply.

Verify uncertain/version-dependent facts against primary sources for the installed version. A supported library feature does not prove integration here. Label important claims as observed, documented or inferred when ambiguous.

When local behavior is decisive, design a small disposable experiment with a confirm/reject criterion. Stay within assigned resources; do not install dependencies, modify application code or contact production merely for convenience.

Compare alternatives only when they affect the decision, including the simplest existing approach. Return a recommendation, file/source references, experiment commands/results, tradeoffs and unknowns. For a blocking unknown, name the next discriminating test, success condition and needed owner/capability. Stop at sufficient evidence; research alone does not authorize implementation or publication.
