# Test structure and fixtures

## Ownership and purpose

Keep `tests/` at the smallest self-contained owner. For example, preview behavior belongs in `parts/home/preview/tests/`; `parts/home/tests/` owns page composition, layout and wiring. Render real children: isolation means independence from the surrounding page and other tests, not mocking every child. Add a parent suite only for a contract that the child suites cannot establish, such as whole-page overflow or an interaction between features.

Test each contract at its owner. Shared primitive behavior and contrast belong in `packages/ui`; app suites check the supplied data, accessible copy and composition without repeating the primitive's assertions. UI suites stay beside their owned components.

A file covers one concern, such as validation, keyboard behavior, layout or motion. Each test protects one behavioral outcome; several assertions can describe that outcome. Split independent journeys rather than chaining them into a long test. Keep states, themes and viewport cases for the same concern together. Do not split files or tests merely to meet a line count.

Use `.test.ts` unless JSX needs `.tsx`. Describe the subject and behavior with readable test names. Filesystem tests use disposable directories and clean up their own output.

## Harnesses, fixtures and helpers

Keep rendering, reusable scenario setup and helpers separate from test assertions. A suite-local `utils/page.tsx` owns subject markup and required providers; it can export a render function. Load `@kivo/ui/styles.css` from the harness or the package's browser setup. Use `utils/context.ts` (or `.tsx` when needed) for Vitest fixtures that arrange reusable states, await readiness and register cleanup. Do not add fixture layers for a trivial render.

Put named calculations and reusable operations in `helpers/`, with meaningful helper logic covered by a focused test. Keep one-off locators and simple steps in their tests. Expected outcomes stay visible in the test; fixtures establish readiness without asserting the contract under test.

Helpers, fixtures, data and mocks stay local until another owner needs them, then move to `src/tests/<kind>/`. Promote runner utilities to `@kivo/vitest` only when multiple packages need them. Keep feature-specific setup out of global browser setup. The helper or fixture that changes viewport, theme, text size, media preferences or other shared state registers restoration immediately, including for failed tests. Global setup may establish a common baseline; it does not replace cleanup by the state owner.

## Mocks and cleanup

Mock framework boundaries that cannot execute in the browser runner, rather than the component behavior under test. Add local mocks and restore them; promote them only when another suite needs the same contract.

Keep expected values independent of implementation. Clean up listeners, timers, media emulation, network spies and DOM state. See [Browser pitfalls](browser.md).
