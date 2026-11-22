# Pull requests

Use [the PR template](../../.github/pull_request_template.md). A request to submit a PR authorizes preparation, scoped commits, pushing and opening a draft. It does not authorize an unrequested merge or deployment. Ready actions and pushes to a ready PR follow the authorization given for that PR; do not ask twice for the same action.

## Prepare and submit

Use `[<type>]: <description>` for the title, lowercase with no period. This differs from the commit format. Put repository identifiers in inline code, assign the author when appropriate and apply a matching label if it exists (`fix` uses `bug`).

The body explains the concrete problem, resulting behavior and material tradeoffs. Include relevant validation and gaps so a reviewer can assess the result. Omit command-by-command history. If there is a demand or slice, reference it under Related issues. Use `Closes #<n>` only when merging that PR completes the demand; omit empty sections when there is no related issue. Image-affecting demands that require deployment verification remain open until that verification succeeds.

Use structured tool bodies or `--body-file` to preserve Markdown and avoid shell interpolation. Open with `gh pr create --draft` against `master` or the assigned parent. Follow host linking rules immediately after creating or pushing to the PR.

## Review and ready

Complete relevant checks and [review](../quality/review.md) before readiness. Fix material findings in this work and disclose missing evidence. UI checks cover the changed interactions, relevant widths, themes and motion settings; docs changes need reference and factual checks.

Draft pull requests skip the CI check job. When authorized, mark ready with `gh pr ready <n>` to start CI; inspect every expected check on the current head. Empty/skipped checks are not a pass. Later pushes rerun CI, so batch settled fixes where practical.

Use host-supported event-driven monitoring when waiting is required. Children report status to the lead; they do not own persistent watches. Follow the host lifecycle rather than shell polling or `gh --watch` loops.

## Merge

Merge only when authorized and the current head's expected checks and review are complete. Branch protections vary by repository; inspect the current settings and checks explicitly.

Squash with `<type>(<scope>): <subject> (#<n>)` and a blank body. Validate the subject before merging:

```bash
echo '<type>(<scope>): <subject> (#<n>)' | pnpm exec commitlint
gh pr merge <n> --squash --subject '<type>(<scope>): <subject> (#<n>)' --body '' --delete-branch
```

Merging to `master` runs CI; a successful push can trigger [deployment](../delivery/cd.md) if enabled. Report the PR URL, head, checks/review state and remaining action.
