# Performance

Measure the affected journey before optimizing it. Use production builds for loading/bundle claims and real interactions for responsiveness.

Start with server rendering and native browser behavior. Check network requests, client JavaScript, layout shifts and main-thread work when the change could affect them. Use [Patterns](patterns.md) for common boundaries and the [perf skill](../../agents/skills/perf/SKILL.md) for investigations.

For local Lighthouse comparisons, run comparable production builds with the same route, browser, viewport and throttling. Preserve the reports and tool version, and report unavailable network, hardware or browser coverage.
