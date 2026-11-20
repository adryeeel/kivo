---
name: kivo-ui
description: Build or review Kivo mobile-first screens using its neutral and violet dashboard design, with private and family modes, accessible financial forms, and responsive expense lists.
---

# Kivo interface work

Read the relevant tokens and wireframe in [design](../../docs/design.md) and the
slice's criteria in [plan](../../docs/plan.md). Follow the user's reference; avoid
inventing a new visual theme for each screen. The library choices are proposed
until installed; inspect the real component APIs before coding against them.

- Start with the phone task: add a split, settle up, or mark a goal contribution.
  Use the existing primitives and tokens; create no parallel button/form system.
- Keep Personal/Family context explicit. Hide private data across scope changes
  and keep current-month spending distinct from all-time debts and goal progress.
- Preserve the reference's quiet borders, violet actions, left-aligned typography,
  and right-aligned amounts. Adapt table rows into readable phone lists.
- Financial forms need visible labels, decimal keyboards, clear share previews,
  field errors, preserved input on failure, and stable retry behavior. Wait for
  confirmation before displaying a financial save as complete.
- Use labeled navigation, at least 44 px touch targets, accessible dialog focus,
  safe-area padding, readable 16 px phone inputs, and reduced-motion support.
  A status cannot rely on color alone. A settlement button must say Record payment.

Review populated, empty, slow, error, and stale-edit states at 320/390/768/1440 px.
Check long member names, large amounts, keyboard focus, and 200% zoom. Inspect
screenshots of the running UI when available. Describe untested states honestly;
emulation does not replace real phone checks before a pilot.

After each slice, critique the result against its task and reference, fix material
issues, and record evidence and limits in [reviews](../../docs/reviews.md).
