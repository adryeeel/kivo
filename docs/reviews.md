# Iteration reviews

Keep concise entries for consequential findings and fixes, with evidence and
remaining limits. The same agent can change roles; do not describe self-review
as independent review. Record completed checks separately from planned checks.

## Planning iteration 1: scope and design

Critique: a generic family dashboard could assume one shared ledger and expose
personal finances. It could also prioritize charts over the user's core task.

Improvement: after the user clarified priorities, the plan now gives each member
a private workspace and puts family splitting and goals before personal budgets.
The design specifies payer/share/debt information rather than subscription KPIs.
The stack keeps API and web separate without premature shared UI/DB packages.

Critique: a desktop reference cannot establish usable phone controls or readable
text. Decorative sparklines would imply undefined comparisons.

Improvement: distinct phone/desktop wireframes, explicit responsive breakpoints,
44 px actions, 16 px phone inputs, labeled time scopes, and no mandatory charts.

Evidence: inspected the empty repository and supplied image; researched primary
UI and stack documentation. No running app exists, so no UI/runtime claim is made.

## Planning iteration 2: financial and privacy consistency

Findings from reviewing the written draft:

| Issue | Improvement |
| --- | --- |
| Reversal request could be mistaken for immediately removing a settlement | Keep the settlement Confirmed until the other party approves reversal; specify the atomic transition |
| A removed member could lose personal spending totals, or regain shared details through a summary | Preserve own historical share amounts/date/category only; block household detail access and freeze expenses involving former members |
| Personal budgets had no category mapping for shared shares | Use stable common expense category keys; defer custom category management |
| Goal permissions referred to creators without a creator field or explicit reversal shape | Add creator, contribution/reversal kind, exact original linkage, and actor permissions |
| Goal contribution and member-removal writes could race | Specify household-first locks and recheck access for all household financial writes |
| Refund handling was undefined | Specify audited original-expense correction and its original-month reporting limit; defer dated refund records |
| A simple row CHECK cannot prove all shares sum to the expense | Require transactional sum validation and rollback/integration coverage |

Re-review: the roadmap and local skills refer to the corrected balance, privacy,
and budget rules. No database/API/UI behavior has been implemented. These are
design decisions and acceptance requirements, not test results for an app.

Executed validation: both repository skills passed the skill-creator validator.
All 17 local links across eight Markdown files resolved, code fences were
balanced, and the tracked diff passed whitespace checks. Primary documentation
links were researched during planning; no packages were installed.

Remaining limits: EUR/English/timezone defaults and the hosting/email provider
need validation before a pilot. The wireframes have not been rendered or tested
on phones; the proposed runtime and financial rules have not been implemented
or exercised. Refund corrections restate the original month, and historical
expenses involving departed members are frozen in the first release.
