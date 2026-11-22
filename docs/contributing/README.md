# Contributing

Changes land on `master` through squash-merged PRs. Never commit or push directly to `master`. Local preparation follows the user's requested scope; publication, readiness, merge and deployment follow the authorization below.

## Delivery Loop

The Delivery Loop is the shared name for taking a change from an intended outcome to verified delivery. Scale each step to the work and revisit earlier steps when evidence changes the approach; it is not a requirement to create an issue, delegate, or run every specialist audit. The loop applies to work by one agent or a team. For available roles and coordination when delegation is authorized, see [Agent workflows](../agents/README.md).

1. **Scope:** Define the outcome, acceptance criteria, constraints and non-goals. For substantial work, use [demand planning](demand-planning.md).

2. **Research and plan:** Inspect existing behavior, resolve meaningful unknowns and choose an approach, slices and checks.

3. **Critique:** Challenge consequential plans before implementation. Critique examines an approach; review examines the resulting change; an audit investigates a defined risk or broader area when warranted.

4. **Implement and validate:** Make reviewable changes and check the integrated behavior against acceptance criteria. Select tests and specialist checks for the actual risks.

5. **Review:** Inspect the final change and resolve material findings. Follow [Review](../quality/review.md) for scope, independence and evidence.

6. **Commit and open a PR:** Follow [Commits](commits.md) and [Pull requests](pull-requests.md), recording useful validation and limitations.

7. **Merge and verify delivery:** Merge only with authorization and the required current-head evidence. Verify deployment and affected behavior when applicable, then close the demand when its acceptance target has evidence. See [demand completion](demand-planning.md#project-and-completion).

8. **Assess completion:** Before handoff, compare the outcome and evidence with the request, and report gaps. Investigate process improvements when execution shows a need; see [completion assessment](../agents/README.md#completion-assessment).

Continue through authorized steps using evidence for the current change; revisit affected checks after fixes. Disposition discoveries through [demand planning](demand-planning.md#discoveries). Use [improvement within delivery](../agents/README.md#improvement-within-delivery) for warranted procedural corrections. A task can finish without changing its instructions.

| Task                                  | Read                                      |
| ------------------------------------- | ----------------------------------------- |
| Record a problem or create a branch   | [Issues and branches](issues.md)          |
| Make commits or update branch history | [Commits](commits.md)                     |
| Submit, ready or merge a PR           | [Pull requests](pull-requests.md)         |
| Track a demand and its progress       | [Demand planning](demand-planning.md)     |
| Deliver slices across PRs             | [Slices and integration](split-issues.md) |

Update documentation made inaccurate by the work in the same branch. Keep unrelated changes out; report them for separate tracking. A finding alone does not authorize publishing an issue.

User instructions and host rules take precedence over repository procedures. Carry forward authorization already given; complete the reviewable work before asking for any missing permission.
