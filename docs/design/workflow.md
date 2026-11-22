# Design workflow

Use this workflow for a new page or an authorized UI improvement with meaningful design choices. Small edits need proportionate checks, not a full design team.

## Constraints and freedom

Follow accepted [brand constraints](brand.md) when the project defines them. Current layouts, spacing, density, breakpoints and component arrangements can improve within the requested scope. A new page need not copy the home page. Keep accessibility, correctness, security and engineering boundaries; a current layout is not evidence of conformance.

Routine design decisions belong to the assigned designer/engineer. Ask for a user choice when requested or when missing information materially changes the outcome. Shared changes need ownership coordination. Update the documented pattern when the change adopts a new one.

## Brief, explore, critique, implement

1. Establish the primary user task, entry point, desired next action, content hierarchy, constraints and observable acceptance criteria. Record evidence and assumptions separately.

2. Explore different structures only when a real choice remains. Use realistic content, narrow/wide layouts, relevant themes and genuine alternate states. A static page does not need imaginary loading states.

3. For consequential choices, obtain independent critique of rendered concepts against the task and brand. Findings name the screen/state, user impact, evidence and smallest useful change. The lead selects within authority unless the user asked to choose.

4. Implement the chosen direction with real behavior. Check the integrated page for visual fidelity, keyboard tasks, focus, responsive reading order and relevant failure states. Recheck material deviations from the concept.

Stop iterating when material problems are resolved and tradeoffs recorded. Agreement about taste is not a completion condition. Static images show composition, not working interaction; source inspection shows implementation, not verified visual quality. Identify the actual artifact/revision, viewport and environment for evidence.

## Roles and skills

| Responsibility                                | Role                     | Procedure                      |
| --------------------------------------------- | ------------------------ | ------------------------------ |
| Task, content and acceptance brief            | `ux-designer`            | `design-brief`                 |
| Visual direction and responsive specification | `ui-designer`            | `design-exploration`           |
| Independent task/brand/craft critique         | `design-critic`          | `design-review`                |
| Implementation and refinement                 | `design-engineer`        | Relevant `test`, `qa`, `perf`  |
| Focused accessibility evaluation              | `accessibility-reviewer` | `qa`, applicable WCAG criteria |

Role briefs live in [`agents/roles/`](../../agents/roles) and procedures in [`agents/skills/`](../../agents/skills). Use specialists when delegation is authorized and useful; role names do not require spawning a team. Assignment and ownership rules live in [Agent workflows](../agents/README.md).

Installed craft skills can help with composition, touch behavior, motion or component detail. Honor their invocation policy and host tool precedence. They do not replace the brand or authorize installation, outreach or extra work. Do not require a component prototype workflow for every page.

## Honest evidence

Use supplied interviews, observations or analytics as such. Desk research, inspiration, heuristics and agent walkthroughs are different evidence; they cannot establish measured user preferences or conversion gains. Label sample material and never invent achievements or testimonials. Recruitment/outreach needs its own authorization.

Use [component/accessibility checks](components.md#verification-target) for the relevant manual and automated evaluation. Record unavailable browser, real-device or assistive-technology coverage rather than claiming conformance.
