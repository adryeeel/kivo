---
name: qa
description: Validate user and author workflows in an integrated application against agreed acceptance criteria, including regressions automated tests may miss. Use for product QA after a runnable change, not as a substitute for compiler tests or code review.
---

# Verify the integrated experience

Inputs are the runnable revision/environment, acceptance criteria, baseline/known issues and owned browser/fixture resources. Read relevant [design](../../../docs/design/README.md), [architecture](../../../docs/architecture/README.md) and [testing](../../../docs/testing/README.md) guides. For a redesign, use its accepted brief rather than enforcing old composition.

Exercise affected reader journeys: navigation, task completion, keyboard/focus, relevant widths/themes, motion preferences and error recovery. Inspect console/network failures. Unit passes and screenshots are useful evidence but do not establish a complete interaction.

Include author/operator workflows when affected. If resources are unavailable, report that check as not run and continue independent checks.

Use the host's supported browser tools and lifecycle. Keep production files read-only. Return reproducible expected/actual results with revision/environment and evidence, separating regressions, baseline defects and uncertain observations. Mark checks passed, failed or not run; distinguish dev, production, emulated and real-device evidence.

Clean up only owned resources. The engineer owns fixes; finish with acceptance coverage and exact gaps, not a redesign or conformance claim.
