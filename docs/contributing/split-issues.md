# Deliver a demand in slices

Use [Demand planning](demand-planning.md) for the live plan and discovered work. A slice can have a PR without its own issue. Promote a workstream to a sub-issue when it needs independent ownership, discussion or delivery; prefer one parent level and link its canonical status from the demand.

## Branches and integration

A complete, safely deployable slice can branch from `master` and merge back after review, checks and authorization. Preserve the existing experience when incomplete functionality is not ready for release; deployment is opt-in and follows successful CI.

When slices must ship together, create one integration branch for the demand. Start slice branches from its current tip and target it with their PRs. Independent work can proceed in parallel with disjoint ownership; dependent work waits for its contracts and compatible base. After a squash merge, start dependent branches from the updated integration tip. Update existing branches explicitly and verify ancestry; do not use `git merge -s ours` to hide unexplained conflicts.

The lead owns integration and coordinates writes. Run combined checks on the integrated result. A slice is Integrated only after its acceptance, review, checks and merge into its agreed target; that does not mean the demand is released.

## Final review and release

Review the combined change against the demand's acceptance criteria. Fix findings with ordinary commits on the final PR branch and recheck them; no separate repair issue or PR is required. If a finding invalidates an integrated slice, reopen its plan row and update its evidence.

An image-affecting demand remains open until deployment and relevant smoke checks meet its acceptance criteria. Reference it in the final PR without a closing keyword if post-merge verification remains. Close it after acceptance. Docs-only work can complete at merge when that satisfies its criteria. Closing keywords on PRs into non-default branches do not close issues.
