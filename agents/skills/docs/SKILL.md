---
name: docs
description: Write, reorganize or review repository documentation, including READMEs, AGENTS.md, roles and skills. Use when a change adds or changes guidance.
---

# Maintain documentation

Read [Documentation conventions](../../../docs/quality/documentation.md) and the affected guide, its entry point and relevant source/configuration. For roles or skills, also read [instruction maintenance](../../../docs/agents/instructions.md). Inputs are the requested outcome, changed paths/base and whether the assignment permits edits or is review-only.

## Before adding guidance

Identify the reader's task and search for existing guidance on it. Decide whether the change corrects the owning page, links to it, adds a distinct topic or removes material. Check the source behind commands, values and behavioral claims; do not document a proposed change as current behavior.

For each new rule, identify its canonical owner and a concrete failure it prevents. Put facts in configuration or the relevant topic guide, procedures in skills and responsibility in role briefs. Entry points route readers. A short prerequisite summary can link to its owner; a copied procedure or separately maintained inventory needs consolidation.

## Improve from delivery evidence

For a reusable workflow failure found during execution or the [completion assessment](../../../docs/agents/README.md#completion-assessment), read [instruction maintenance](../../../docs/agents/instructions.md#retain-improvements-from-delivery). Record the failing scenario, revision and observed result; diagnose the cause before adding guidance. Prefer correcting the existing owner or following an existing rule over creating another instruction.

For a correction within scope, define the observable improvement, make the smallest change and use [behavioral evaluation](../../../docs/agents/instructions.md#evaluate-behavior). Report untested claims and retain an unvalidated candidate as a proposal. Stop when acceptance has evidence or a specific missing input/capability blocks progress; another attempt needs new evidence or a changed hypothesis. Ordinary successful work requires no lesson or guidance edit.

## Edit or review

Apply the [documentation checks](../../../docs/quality/documentation.md#validation) to the changed guidance and affected entry points. A page with unrelated reader tasks may need a split; a cohesive page does not need splitting to meet a word limit. Delete filler and stale logs while preserving reasons, exceptions and operational safeguards.

In editing work, make scoped corrections and update incoming references when moving material. In review-only work, leave files unchanged and report findings through [Review](../../../docs/quality/review.md). Do not turn a typo fix into a repository audit or flag a local formatting preference without a reader impact.

## Verify and finish

Check formatting, local targets/heading fragments, and renamed paths across documentation, instructions, templates and script callers. Follow each affected entry point for a realistic task, recording the path and whether it reaches the needed guidance without unrelated prerequisites. Check substantive claims against source, not only links.

Return changed paths or prioritized findings, canonical owners, task routes checked, factual/mechanical evidence and gaps. Distinguish introduced problems from existing out-of-scope debt. Finish when the requested guidance is usable and verified or remaining limitations are explicit. Do not claim that formatting/link checks establish editorial quality or that this skill is an automatic CI gate.
