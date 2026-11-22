# Issues and branches

## Issues

An issue records the problem, relevant evidence, intended outcome and current approach. Agree on enough of the approach to start the next slice; record unresolved questions and revise the plan as work reveals more. A correction to wording, a wrong fact or a comment can skip the issue if it changes neither behavior nor policy; its draft PR explains the problem. Directly requested local work can proceed without inventing permission to publish an issue.

Use `.github/ISSUE_TEMPLATE/` and preserve the form's fields. Bugs distinguish reproduction, expected/actual behavior and confirmed cause from hypotheses. Other forms state the problem and proposal. Rewrite the final proposal after agreement so readers do not have to reconstruct the decision from comments.

Titles use `[<type>]: <description>`, lowercase and no trailing period. Put repository paths and commands in inline code. Apply a matching label if it exists and assign the author when appropriate. Include evidence that changes the decision, not a run log. Link affected documentation sections with their repository path.

Use [Demand planning](demand-planning.md) to track accepted work and disposition discoveries. Multiple independent PRs may be open; coordinate shared files and integration. Create a separate issue only when work needs its own decision, owner or delivery, within authorization.

## Branches

Use `<type>/<scope>/<desc>` with one to three kebab-case description words, for example `docs/repo/focused-guides`. Types and scopes follow [Commits](commits.md).

Start from up-to-date `origin/master`, or the integration branch for a dependent slice. Use `git switch -c <branch> origin/<base>`. Reference the demand and slice in the PR body when one exists. Do not link a branch or PR through GitHub's Development sidebar when its merge does not complete demand acceptance, including a final PR awaiting deployment verification; linked default-branch PRs can close issues automatically.

Inspect branch, index and working tree first; preserve unrelated work. A branch solves its assigned slice including needed tests and docs. Widen it only when the user's scope includes the additional work.
