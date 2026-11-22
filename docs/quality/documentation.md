# Documentation conventions

These conventions apply to Markdown in `docs/`, READMEs, `AGENTS.md`, role briefs and skills, as well as issue and PR prose.

## Content and ownership

Write for a concrete task. Keep procedures, reference rules and decision rationale distinguishable. A topic page should be useful without loading every sibling; link prerequisites and relevant details directly. Split by reader need, not an arbitrary line limit, and avoid empty pages or one-paragraph fragments.

A rule has one owner. Other guides link to it rather than repeating it. Configuration owns exact versions, values, scripts and inventories; docs explain usage and constraints the files cannot explain themselves. Check facts against implementation before editing them.

Distinguish required constraints, current conventions and proposals. Do not turn a description of one component into a universal rule. Preserve useful failure modes and operational safeguards when shortening prose.

Update affected docs and links in the same change. When moving a page, search Markdown, skills, role briefs, templates and script callers for its path and headings. Avoid leaving duplicate redirect pages inside the repo; Git history retains the old material.

## Writing

Use plain language and active verbs. One paragraph or list item develops one idea; split multi-step procedures into steps. Use tables for real comparisons or mappings, not long prose cells. Keep repository paths, commands and identifiers in inline code.

Keep each paragraph on one source line. Separate list items with blank lines. Avoid inventories of files that the directory already exposes and repeated setup instructions outside [Getting started](../getting-started.md).

Measurements and investigation logs belong in the issue or PR. [Decisions](../decisions/README.md) keeps the durable choice, reason, reconsideration condition and evidence link. Do not state an old benchmark as a current performance guarantee.

## Validation

Use the [docs skill](../../agents/skills/docs/SKILL.md) for writing and review. Check the changed guidance, with scope proportional to the change:

- **Ownership:** each rule or procedure has one canonical location; other pages link to it. Configuration-backed values and inventories are not separately maintained in prose.

- **Focus:** the page serves a recognizable reader task. Move unrelated tasks into linked topics; merge fragments that are unusable without their siblings. Length alone is not a defect.

- **Accuracy and strength:** claims match current source, constraints differ from conventions/proposals, and rules prevent a concrete failure. Preserve useful reasons, exceptions and safeguards; remove stale logs and unsupported guarantees.

- **Navigation:** a realistic task reaches the owning guide from an affected entry point without loading unrelated guides. Moves update incoming references and leave no orphaned topic.

- **Mechanics:** formatting, local paths and heading fragments resolve; removed names are checked across docs, instructions, templates and callers.

Reviewers report the location, reader consequence and smallest correction for a failed check. Cosmetic preferences and arbitrary size caps do not block a change. A typo correction does not require auditing unaffected pages.

Record the canonical locations and task routes inspected, source checks, mechanical results and coverage gaps. A link checker cannot prove accuracy or discoverability. These are author/reviewer requirements; the current CI formatting job does not automatically enforce editorial quality.

This organization uses [Diátaxis](https://diataxis.fr/how-to-use-diataxis/) to separate reader needs without adding a documentation framework or requiring four artificial top-level categories.
