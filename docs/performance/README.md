# Performance

Measure the affected journey before optimizing it. Use production builds for loading/bundle claims and real interactions for responsiveness.

Start with server rendering and native browser behavior. Check network requests, client JavaScript, layout shifts and main-thread work when the change could affect them. Use [Patterns](patterns.md) for common boundaries and the [perf skill](../../agents/skills/perf/SKILL.md) for investigations.

`agents/skills/perf/scripts/bench.sh` compares local production builds using Lighthouse and a Playwright Chromium executable. It downloads Lighthouse on demand and writes reports to temporary output. Read its flags and cleanup first; unavailable network, hardware or browser coverage must be reported.
