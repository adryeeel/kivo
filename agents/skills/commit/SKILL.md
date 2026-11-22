---
name: commit
description: Create a feature branch, stage scoped changes and make Conventional Commits, including repository-approved history cleanup. Use for branch and commit work; pushing and PR operations belong to pull-request.
---

# Commit

Read [Issues and branches](../../../docs/contributing/issues.md) and [Commits](../../../docs/contributing/commits.md). Inputs are the intended base, owned changes and commit purpose. Pushing and PR work use [pull-request](../pull-request/SKILL.md).

1. Inspect branch, index, working tree and relevant PR state. Preserve unrelated work; never commit to or rewrite `master` or merged history.

2. Create a branch from the appropriate base using the contribution guide. Avoid Development links whenever merging the branch or PR does not complete demand acceptance, including a final PR awaiting deployment verification.

3. Group by logical change. Stage explicit paths/hunks, inspect the complete staged diff and run applicable checks. Use configured scopes; do not add attribution trailers.

4. Commit without bypassing hooks. After a rejected commit, inspect the resulting index before retrying.

For history cleanup, apply the guide's before/after-PR rules. Verify ownership, save the current tip and protect unrelated work before rewriting. A published base update normally merges; `-s ours` requires verified tree equivalence, never unexplained conflicts.

Return branch, created commits, checks and any intentionally unstaged files. Stop before remote actions outside the assignment.
