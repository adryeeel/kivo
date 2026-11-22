---
name: perf
description: Investigate or measure web performance, including production-build comparisons, bundle cost and live PageSpeed results. Use for requested audits and changes with a relevant performance risk.
---

# Investigate performance

Read [Performance measurement](../../../docs/performance/README.md) and [Cost patterns](../../../docs/performance/patterns.md). Inputs are the question, route, candidate/base revisions, settings and owned output resources.

Choose evidence for the actual risk: bundle cost, rendering, latency and build time are different questions. Inspect the import/work graph before measuring. A suspicious pattern is a hypothesis until supported by measurement.

For local Lighthouse, use comparable production builds and settings as described in the measurement guide. Preserve every run and tool version. Run baseline/candidate sequentially; do not reset the user's working tree or create an unbound delegated checkout.

For live results, discover available tools and use credentials only through supported secret mechanisms. Keep local lab, remote lab and field evidence separate. Unavailable data is not zero and missing measurements do not prove no regression.

Interpret variability and connect metrics to the changed work. Clean up only owned servers, checkouts and artifacts. Return revisions, settings, runs, interpretation and limits; store durable conclusions in owned docs and measurements in the task/PR. A benchmark does not authorize deployment or baseline replacement.
