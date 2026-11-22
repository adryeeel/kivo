# Commits and history

Use `<type>(<scope>): <subject>`. [commitlint.config.ts](../../commitlint.config.ts) defines the allowed scopes and requires one. Use `agents` for `AGENTS.md` and `agents/`, `repo` for root setup, `docs` for general documentation, and the relevant package scope for package changes. Update the allowed scopes when adding a package or a new area of ownership.

Types follow Conventional Commits: `feat`, `fix`, `refactor`, `perf`, `style`, `test`, `docs`, `build`, `ci`, `chore`, `revert`. Subjects are lowercase imperative, without a period or PR number; aim near 50 characters and keep the full line within 100. Add a body only for a useful reason or tradeoff.

## Atomic changes

Each commit has one purpose and passes its relevant checks. Stage explicit paths or hunks, inspect `git diff --cached`, and preserve someone else's staged work. Do not split a logical change merely because it crosses packages.

Before opening a PR, rebase your owned feature branch onto its current base and fold fixups/WIP into meaningful commits. Never rewrite shared or merged history. Preserve distinct concerns; do not manufacture extra commits for file counts.

## Once a PR exists

Use ordinary commits for review fixes. Merge a moving base instead of rebasing; supply `chore(repo): merge <source-desc> into <target-desc>` as the message, with no default merge body. `<desc>` is the branch name's final segment.

A draft may be rewritten to correct wrong/invalid commits or consolidate accumulated fixes. Verify ownership, save its tip, protect unrelated work and push only with `--force-with-lease`; announce the rewrite on the PR. Ready PRs are not rewritten. See [Split issues](split-issues.md) for squash ancestry.

## Hooks

`pnpm install` installs Husky. `commit-msg` runs commitlint; `pre-commit` runs [lint-staged.config.ts](../../lint-staged.config.ts) for formatting and linting. Oxlint and Oxfmt discover nested package configurations for matching files. The lint-staged config defines the file patterns.

If a hook fails, fix the cause, inspect the resulting index and retry. Never bypass hooks. Root formatting must not rewrite app files using the wrong package configuration; see [Getting started](../getting-started.md).
