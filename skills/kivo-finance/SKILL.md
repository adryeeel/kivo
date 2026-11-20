---
name: kivo-finance
description: Implement or review Kivo expense splits, settlements, goals, budgets, and workspace authorization. Use for financial behavior and private versus family data access.
---

# Kivo financial changes

Read the relevant rules in [architecture](../../docs/architecture.md). The
first release prioritizes family splitting and goals, with private personal
tracking. This skill does not authorize bank access, payments, or deployment.

Before editing, identify the amounts and records affected, who can read/write
them, and the totals that must change or stay constant. Follow existing callers
through API contracts, database queries, UI summaries, exports, and fixtures.

Keep these invariants visible in implementation and review:

- Money is bounded integer minor units. Equal splits allocate every cent once,
  deterministically; exact shares sum to the expense. Store the result.
- Household net balances sum to zero. Only confirmed settlements change them;
  settlement is never new spending. Confirmations use fresh locked balances.
- Personal spending includes one's family shares once, not full family payments.
  Goal earmarks change neither expense totals nor debts.
- Another member, including the household owner, cannot read personal finances.
  Validate workspace membership and nested IDs on the server, including exports.
- Financial writes, history, and idempotency receipts commit atomically. Retry
  keys do not replace access checks. Version conflicts never overwrite silently.

For changed logic, choose small tests that demonstrate the actual invariant:
EUR 0.10 split three ways, payer excluded from participants, mismatched exact
shares, cross-workspace nested IDs, repeated requests, two concurrent settlement
confirmations, or a reversal. Test PostgreSQL behavior against PostgreSQL when
correctness depends on a constraint or lock; do not substitute a mocked query.

After implementation, review the behavior with the role of a second household
member and an unrelated user. Record the finding, fix, and observed evidence in
[reviews](../../docs/reviews.md); distinguish planned checks from executed ones.
