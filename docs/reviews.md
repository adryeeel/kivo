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

## Login iteration 1: first working screen

Implemented a pnpm workspace and React/Vite frontend with a family preview,
email/password form, password visibility, and Light/Dark/System selection.
Used Base UI's controls/dialog behavior and local CSS rather than generating
unused UI components. The login deliberately sends no credentials until an
authentication service exists; account/reset actions explain that boundary.

Critique from desktop and phone screenshots: the overall hierarchy follows the
reference, but some secondary text was too small and the desktop composition
would become crowded on a tablet. Increased text to at least 12 px (14 px for
form labels/actions) and switched to the single-column form below 1024 px.
Appearance controls have 44 px targets. The preview is explicitly illustrative.

## Login iteration 2: theme, accessibility, and validation

Findings and fixes:

- The newest TypeScript release was incompatible with the ESLint parser.
  Pinned supported TypeScript 6.0.3; dependency peer checks now pass.
- Theme choice needed to work before the React/CSS bundle, with storage blocked,
  on OS changes, and across tabs. Added pre-paint initialization, a dark startup
  canvas, safe storage handling, and synchronized preferences/browser chrome.
- The brand and avatar illustration used names on generic elements. Added
  meaningful image roles; the automated unresolved ARIA findings are cleared.
- Light-theme decimal amounts had 3.99:1 contrast. Darkened the secondary token
  and re-audited both themes; the finding is resolved.

Re-review and executed evidence:

- ESLint, strict TypeScript, Prettier checks, and Vite production build passed.
- All 24 Playwright checks passed across desktop/mobile Chromium. They cover
  pre-paint/system/persisted/cross-tab themes, invalid/blocked storage, required
  fields, password visibility, no credential requests/storage, dialog focus
  restoration, 200% layout scaling, and 320/390/768/1440 px widths in both themes.
- Browser screenshots inspected at desktop and phone sizes. axe WCAG 2 A/AA
  audits of light/dark desktop and phone views reported zero violations and
  zero incomplete checks after fixes. Automated checks do not replace manual
  screen-reader or real-device testing.
- WebKit was installed but cannot launch on this host because its required
  libicu74/compatible libxml2 libraries are missing. The optional WebKit project
  is retained for a supported environment; it is not part of the passing claim.

Remaining scope: real authentication, registration/reset flows, API, financial
features, Safari and real iOS/Android hardware verification. No deployment or
new cloud service was created for this repository-local first look.
