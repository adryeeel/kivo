# Plan and track a demand

Use one issue for an independently valuable demand. The issue body owns the current outcome, acceptance criteria, non-goals, slice plan, blockers and material decisions. PRs own review, check and merge evidence. No GitHub Project board is required or configured.

## Live plan

For substantial work, record a stable ID, observable result, executor, prerequisite or blocker, state, PR and evidence for each slice. Small one-PR changes can use a short checklist. Start with enough detail to act; research unknowns before dependent work and revise the plan as facts emerge.

| Slice | Result            | Executor             | Dependency | State   | PR / evidence |
| ----- | ----------------- | -------------------- | ---------- | ------- | ------------- |
| S1    | Example contract  | Integration engineer | None       | Planned | Pending       |
| S2    | Example user flow | Design engineer      | S1         | Planned | Pending       |

States are Planned, Doing, Review and Integrated. A blocked slice retains its phase and names the blocker. Integrated means its acceptance, checks and review passed and its PR merged into the agreed target; it does not mean the whole demand shipped. Link evidence and revision rather than copying logs. If later work invalidates a slice, reopen it and qualify stale evidence.

The lead is the single writer of the shared plan. Before delegation, record the owner, target/base and dependencies. Children return their revision, checks, blocker and proposed update. The lead updates the record on assignment, handoff, blocker, material scope change and integration, and reports the demand link and next action at handback. If GitHub is unavailable, retain the pending update and disclose that published status is stale. Publication follows the user's existing authorization.

Record material scope decisions with date and reason; keep the current acceptance and plan consistent. Do not make an issue for each agent or routine task. For a promoted sub-issue, reference its canonical status rather than maintaining a second status for it in the parent.

## Discoveries

- Fix a defect introduced by an open slice in that PR, then rerun affected checks.

- Add work required for accepted behavior to the current slice or a new slice. Record a material scope decision before dependent implementation.

- Triage an independent production defect for its own issue and delivery when warranted and authorized. Link it as a blocker only if it actually blocks this demand.

- Record optional improvements as deferred or rejected; promote one to an issue only when it merits an independent decision or delivery. Never defer a required acceptance failure as optional.

## Project and completion

Close a demand when its agreed acceptance target has evidence. A task targeting local implementation can finish after local checks; a task targeting release also needs deployment and relevant smoke checks. A merge alone does not prove release acceptance. Use [slice delivery](split-issues.md) for branching and final review.

If the project adopts a board, document its actual fields and authorization before updating it. Do not create a board, issue or status workflow merely because a portable role mentions demand planning.
