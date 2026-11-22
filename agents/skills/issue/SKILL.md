---
name: issue
description: Draft, create or update a GitHub issue, or split agreed work into sub-issues using the repository forms. Use for issue preparation and tracking; a review finding alone does not authorize publication.
---

# Issue

Read [Issues and branches](../../../docs/contributing/issues.md), the relevant form under `.github/ISSUE_TEMPLATE/`, and [Split issues](../../../docs/contributing/split-issues.md) when needed.

Distinguish drafting from publishing. Use the agreed problem and current approach; record unresolved decisions and check existing issues before creating a duplicate. A review finding alone does not authorize publication. An unknown bug cause stays unknown, with confirmed evidence and ruled-out hypotheses.

Follow form field order using `### <label>` headings. Describe the concrete trigger, expected/actual result and affected location, then the proposal or cause the form requests. Keep only decision-relevant evidence. Use the guide's title, label and assignee conventions.

Write exact Markdown through a structured argument or a temporary `--body-file`. Quote shell titles safely: backticks inside double quotes execute commands. Publish only the authorized issue; preserve the draft if publication fails.

Use [Demand planning](../../../docs/contributing/demand-planning.md) for the live plan and discovery triage. For independently tracked sub-issues, define scope, dependencies and completion first. Verify the available API/CLI actually creates the parent relationship; a prose mention is not equivalent. Use [commit](../commit/SKILL.md) and [pull-request](../pull-request/SKILL.md) for subsequent Git operations.

Return the URL or draft and any unresolved decision. Stop once the requested tracking action is complete.
