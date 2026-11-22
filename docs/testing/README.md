# Testing

Choose checks by what can break.

| Boundary                          | Evidence                                                       |
| --------------------------------- | -------------------------------------------------------------- |
| Pure application logic            | Vitest with the shared base config                             |
| React interaction and layout      | Vitest browser config, Playwright Chromium and real components |
| Framework resolution and metadata | Production build and targeted runtime checks                   |
| Container packaging               | Docker smoke check                                             |
| Documentation                     | Formatting, local links and source accuracy                    |

`pnpm turbo run test:check` runs package tests. Both `apps/web` and `packages/ui` use the shared browser configuration. Neither currently has test files, and the configuration allows the test command to pass without them.

Use the [everyday commands](../getting-started.md#everyday-commands) to run or watch tests and install Chromium.

Run targeted tests during iteration, then checks appropriate to the combined change. Inspect selected Turbo tasks; a cached pass is not a new execution. Tests should protect behavior and errors, without duplicating implementation or testing a trivial wrapper.

Read [Structure](structure.md), [Assertions](assertions.md) and [Browser pitfalls](browser.md) when authoring suites.
