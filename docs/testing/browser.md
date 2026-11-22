# Browser state and troubleshooting

Read this when a browser test is flaky, waits forever or passes only in isolation.

## State isolation

Viewport, pointer, media preferences and document state can survive between tests. Set what the suite needs and restore it afterward. Park the pointer away from controls when asserting an unhovered state. Release listeners, timers, spies and observers owned by the test.

When testing reduced motion, restore the emulated preference afterward and allow a frame for media-query listeners to receive changes.

## Timing and failures

Await real user interactions and observable readiness. Playwright waits for moving targets to settle; do not increase all timeouts to hide animation or locator errors. Fake only the timer APIs actually under test, keeping animation frames real when they drive rendering.

A missing element needs investigation of scope, accessible name, rendering and mocks. Framework module errors may need a boundary mock with the correct export shape. A style failure may indicate a missing stylesheet, wrong viewport or leaked state. Do not weaken accessibility assertions to hide production bugs.

Inspect Vitest failure screenshots and matching elements before adding waits. Distinguish environment failures from source regressions. Keep temporary diagnostics out of the final suite.
