# Test structure and fixtures

Keep `tests/` beside the application feature or component being tested. Shared helpers and mocks move to `src/tests/<kind>/` only when multiple suites need them. UI suites stay beside their owned components. A file covers one concern; state and viewport cases for that concern can stay together.

Use `.test.ts` unless JSX needs `.tsx`. Describe the subject and behavior with readable test names. Filesystem tests use disposable directories and clean up their own output.

Browser fixtures render real children and import `@project-template/ui/styles.css`. A suite-local `utils/page.tsx` renders the subject; `utils/context.tsx` can compose Vitest fixtures when shared setup is useful. Keep one-off locators in their tests. Do not add fixture layers for a trivial render.

Mock framework boundaries that cannot execute in the browser runner, rather than the component behavior under test. Add local mocks and restore them; promote them only when another suite needs the same contract.

Keep expected values independent of implementation. Clean up listeners, timers, media emulation, network spies and DOM state. See [Browser pitfalls](browser.md).
