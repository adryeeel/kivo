# Product roadmap

This is the planned product and delivery sequence, migrated from [PR 1](https://github.com/adryeeel/kivo/pull/1). The current foundation has a static home page; the login preview, authentication, API, persistence and financial features are not implemented on this branch. All journeys and capabilities below are planned.

See [Product architecture](architecture.md) for the financial and privacy contract and [Delivery](../delivery/README.md) for the current build and deployment process.

## Product outcome

A family can answer three questions on a phone: what did we spend, who owes whom, and how close are we to our shared goals? Each member can separately manage personal expenses without exposing them to the family.

The priority is manual tracking plus splitting, with family splitting and goals ahead of personal budgeting. The product should use a compact, mobile-first layout. The broader visual direction remains a design decision.

## First release

| Priority | Capability                      | Completion evidence                                                                                      |
| -------- | ------------------------------- | -------------------------------------------------------------------------------------------------------- |
| 1        | Family workspace and membership | Two verified users join one household through a single-use invitation                                    |
| 1        | Shared expenses                 | One payer; selected participants; equal or exact-amount shares; category, date, note                     |
| 1        | Balances and settlements        | Members see what they owe or are owed; recipient confirms a recorded payment                             |
| 1        | Shared goals                    | Target, optional date, member contributions, reversals, progress and history                             |
| 2        | Private personal workspace      | Personal expenses and income are inaccessible to other members, including the owner                      |
| 2        | Salary deductions               | Define gross salary and Social Security and IRS withholding options; manage finances using take-home pay |
| 2        | Monthly budgets                 | Explicit category limits for shared expenses and personal spending; no rollover                          |
| 2        | Search, filters, export         | Workspace-scoped date/category/member filters and CSV export                                             |

Do not require bank accounts to record an expense. This version tracks declared spending and obligations; it does not claim to know bank balances. Multiple payers, percentage/weighted splits, bank sync, receipt OCR, recurring automation, multi-currency conversion, investments, tax reports, native apps, and offline writes are later decisions. No payment is initiated by Kivo. Refunds initially correct the original expense and shares with visible history; dated refund cash-flow reports and corrections involving departed members are deferred.

## Defaults and open decisions

Proceed with EUR, English, one personal workspace plus a shared household, and Europe/Lisbon as initial defaults. Locale and timezone are stored explicitly; formatting must not assume every user shares the developer's machine settings. Currency is fixed once a workspace has financial records. V1 uses one currency across a user's personal and shared views; a mismatch must block aggregation.

Before a production pilot, validate currency/locale, hosting region and backup requirements, email delivery for verification/reset, and the applicable Portuguese salary deduction rules and update process. Pricing, subscriptions, and bank providers are outside this planning slice.

## Main journeys

### Create a household and invite a member

Sign up, verify email, name a household, and copy an invitation link addressed to a verified email. The recipient signs in and accepts. Only the owner manages invitations and membership. Members see who can access the shared workspace; the personal workspace is labeled private from the first visit.

### Add and split a family expense

From Family, tap Add expense. Enter amount and merchant/description, choose who paid, select participants, then preview each share. Equal is the default; exact amounts support unequal contributions without percentage rounding. Save once and show the persisted result with balances refreshed.

Example: Ana pays EUR 90 for groceries split equally among Ana, Bruno, and Clara. Each person's spending share is EUR 30. Ana is owed EUR 60; Bruno and Clara each owe EUR 30. This does not expose any personal expenses or salary.

### Settle up

Bruno records EUR 30 sent to Ana outside Kivo. The record is Pending until Ana confirms receipt; only then do balances change. The UI says Record payment, not Pay. A confirmed settlement is not new spending or income. Show the date, parties, status, and history. Reversals require both parties' confirmation.

### Save toward a common goal

Create Summer holiday, target EUR 2,400, optional deadline. Each member can mark a contribution as saved and see attribution and progress. These are self-reported earmarks, not bank deposits or debts. Explain this next to the contribution action. Moving money between real accounts is outside the first release.

### Manage personal finances

Switch to Personal. Record private expenses and income. A personal summary can include the member's own family expense shares, clearly separated from private entries; it never copies the full family payment into the personal ledger. The combined view uses compatible currency and calendar settings only.

For Portugal, define a gross salary and configure the applicable Social Security contribution and IRS withholding. Show the deductions and estimated net salary, and use the net amount for personal income and budgeting. Allow the member to enter the actual net pay from a payslip when it differs from the estimate. Keep salary, tax settings and deductions private to the personal workspace. Withholding is an estimate of tax paid during the year, not a final IRS assessment; tax filing and reports remain outside this release.

## Navigation and screen scope

Mobile has four labeled destinations: Overview, Expenses, Goals, and More. The header selects Family or Personal. Family Overview prominently includes Settle up; More contains budgets, members, export, and settings. Desktop adds a persistent sidebar with Overview, Expenses, Balances, Goals, and Budgets. Personal mode has no family-balances screen.

Screens must cover first-run, loading, empty, populated, validation failure, network failure, stale-edit conflict, and access-revoked states. Empty household onboarding leads to inviting a member; empty expenses lead to Add expense.

## Delivery slices

Each slice ends with a critique, fixes, and evidence in [reviews](../reviews.md). These are ordered milestones, not unsupported calendar estimates.

| Slice                      | Deliverable                                                                                                         | Exit criteria                                                                                            |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| 1: foundation and identity | API + web health path, PostgreSQL migrations, sessions, workspace authorization                                     | Clean install/build; fresh DB migration; two-user privacy tests; CI checks enabled                       |
| 2: family splitting        | Invite/join, expense creation/list/detail/edit/void, equal/exact shares, balances                                   | EUR 90 example works end to end; cents, duplicate retry, concurrency and cross-household tests pass      |
| 3: settlement              | Suggestions, record payment, recipient confirmation, reversal history                                               | Pending does not affect debt; simultaneous confirmation is safe; no double-counted spending              |
| 4: common goals            | Goal creation, contributions, reversal, progress                                                                    | Concurrent changes cannot create negative progress; history identifies contributors; no debt changes     |
| 5: personal and budgets    | Private expenses/income, net salary with Portuguese deductions, own family shares, personal/shared category budgets | Owner cannot access another member's data; salary deductions are verified; totals agree with raw records |
| 6: pilot hardening         | Export, failure/recovery UX, backups/restore, performance and real-device review                                    | Acceptance journey passes on mobile and desktop; restore rehearsed; known limits documented              |

Foundation should ship a minimal vertical path, not empty feature folders or a large generated component catalog. The first usable product demo is two users sharing a real persisted expense, followed by settlement and a shared goal.

## Verification strategy

- Unit tests: exact cent allocation, deterministic remainders, balances, reversals, safe integer bounds, and budget inclusion rules. Include unchanged balances while a reversal awaits approval, and own-share-only historical summaries after membership removal.

- API integration tests against PostgreSQL: authorization and privacy on every resource family, invite acceptance, atomic writes, uniqueness, and concurrent mutations. In-memory mocks cannot establish transactional correctness.

- Browser acceptance: two users join, split EUR 90, confirm settlement, contribute to a goal, switch personal/family, and verify private entries stay private.

- UI checks: keyboard and screen-reader basics, contrast, 320/390/768/1440 px, 200% zoom, long names, empty/error states, and slow-network duplicate taps.

- Before pilot: real iOS Safari and Android Chrome checks; mobile emulation is useful evidence but cannot establish hardware keyboard/safe-area behavior.

The intended CI gate includes frozen-lockfile install, lint, typecheck, relevant unit/integration tests, and builds for both applications when they exist. Add the browser journey once slice 2 provides meaningful UI; include settlement and goals as they arrive. Do not invent a coverage percentage as a substitute for the financial and authorization cases.

Quality targets to measure during implementation: no horizontal page overflow at 320 px, interactive controls at least 44 px, p95 expense-list API under 300 ms on a documented 10,000-expense test household, and LCP under 2.5 seconds on a documented mid-range mobile profile. These are targets, not measured results.

## Release boundary

The pilot needs secure sessions, email verification/reset, deterministic money rules, private-workspace isolation, recoverable history, and tested backups. Deployment target and operational costs remain open. No runtime, cloud resources, mail, payment, or deployment action is authorized merely by this plan.
