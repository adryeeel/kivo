---
name: test
description: Design, write or debug regression tests for repository components, pure functions, content compilers and integration boundaries. Choose the test environment by behavior and keep production edits within the assigned scope.
---

# Test behavior and contracts

Read [Testing](../../../docs/testing/README.md), relevant implementation/callers and nearby suites. Inputs are the requested behavior, failure risks and assigned write scope.

State what each check protects and how it could fail. Choose pure/compiler tests, browser interaction, framework build or packaging checks by the boundary. Use the actual transform pipeline for compiler contracts; mocking it does not prove integration. A new Node-only package needs its own suitable runner rather than an inherited browser dependency.

Reuse [suite structure and fixtures](../../../docs/testing/structure.md). Assert [observable contracts](../../../docs/testing/assertions.md) with independent expected values and representative edge cases. Targeted structural snapshots are allowed when the reviewed output is the contract; avoid broad snapshots or file-layout tests.

Restore shared state and use [browser troubleshooting](../../../docs/testing/browser.md) before loosening timing or assertions. A missing accessible name may be a production bug: fix it only within scope, otherwise return a reproducer to its owner.

Run the smallest relevant suite while iterating, then affected checks. Inspect actual task selection and distinguish cached evidence from fresh runs. Expand only for new changes, failures or unresolved concerns.

Return changed tests, commands/results, covered contracts, production changes and gaps. Stop when assigned behavior is verified or identify the exact remaining blocker; do not claim QA or packaging from unit tests.
