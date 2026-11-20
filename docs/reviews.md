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

| Issue                                                                                            | Improvement                                                                                                                          |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| Reversal request could be mistaken for immediately removing a settlement                         | Keep the settlement Confirmed until the other party approves reversal; specify the atomic transition                                 |
| A removed member could lose personal spending totals, or regain shared details through a summary | Preserve own historical share amounts/date/category only; block household detail access and freeze expenses involving former members |
| Personal budgets had no category mapping for shared shares                                       | Use stable common expense category keys; defer custom category management                                                            |
| Goal permissions referred to creators without a creator field or explicit reversal shape         | Add creator, contribution/reversal kind, exact original linkage, and actor permissions                                               |
| Goal contribution and member-removal writes could race                                           | Specify household-first locks and recheck access for all household financial writes                                                  |
| Refund handling was undefined                                                                    | Specify audited original-expense correction and its original-month reporting limit; defer dated refund records                       |
| A simple row CHECK cannot prove all shares sum to the expense                                    | Require transactional sum validation and rollback/integration coverage                                                               |

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

## Refactor iteration 1: shared tooling and Next.js

Migrated the app to Next.js 16.4.6 App Router. `/` and `/login` share the same
server-rendered page, with client boundaries around the form and appearance
controls. Removed the Vite entrypoint/config and direct dependency, ESLint,
Prettier, and Playwright runner/config/tests. Vitest is now the only test runner;
Vite remains only as its internal dependency.

`packages/config` owns Oxlint, Oxfmt, Vitest, and strict TypeScript settings.
Critique: the initial shared formatter config referenced the web stylesheet,
which coupled the shared package to an app. Moved that path to the root consumer
and kept the shared exports independent. Browser libraries likewise live in the
web tsconfig rather than the common TypeScript base. Root and package commands
consume these settings, and type checking generates Next route types first.
The final dependency audit also removed the leftover `typescript-eslint`
declaration and its 87 unused transitive packages; no legacy lint/format runner
remains in the workspace manifests.

Use `next-themes` for appearance: it replaces the custom store, listeners, and
startup script while preserving `kivo.theme`. A mounted gate keeps controls
hydration-safe; its narrowly scoped lint exception explains the SSR requirement.
Vitest checks the real provider integration, pre-hydration script, system/explicit
preferences, cross-tab changes, blocked storage, and saved-theme hydration.

## Refactor iteration 2: size and visual critique

The previous login read as a large marketing page, with a 30–48 px heading scale,
near-full-screen frame, oversized gaps, and repeated footer/privacy messages.
The user clarified that the new version should match the reference's compact
feel more closely, with a different palette.

Changed to a 1040 px desktop frame, 24 px headings, smaller preview and form gaps,
thin dividers, and a single `© Kivo` footer. Removed the decorative welcome lock
and repeated footer content. Replaced violet with spruce green and gray-green
surfaces in both themes. Tailwind utilities replace the large custom stylesheet;
the stylesheet is now 93 lines of tokens/base rules and three reused recipes.

Re-review: compactness must not shrink interaction targets. Kept 44 px targets
and 16 px phone inputs, increased task-critical link text to 14 px, and adjusted
the password-label spacing so its recovery target does not overlap the input.
Used native progress/output elements for their semantics. Static illustration
and branding stay server-rendered rather than expanding the client boundary.

Executed verification:

- Frozen offline install succeeds with no peer dependency issues.
- Oxlint, Oxfmt checks, TypeScript, and the full Next production build pass.
- All 12 Vitest tests pass across component/provider integration and Node SSR.
  These replace relevant behavioral checks; jsdom does not test viewport geometry.
- Next MCP reports no compilation/configuration/runtime errors for `/` and
  `/login`. React inspection confirms the server/client boundaries.
- Browser QA checks 320/390/768/1440 px widths, 24 px heading size, 44 px theme
  targets, 16 px phone inputs, no horizontal overflow, and 200% scaling.
- Light/dark desktop and phone axe WCAG 2 A/AA audits report zero violations
  and zero incomplete checks. Production navigation preserves the saved theme.
- Preview submission remains usable at 200% and leaves credentials out of the
  URL/storage; Vitest also verifies no fetch call. Dialog tests restore focus.

Limits: browser layout checks were runtime QA, not jsdom regression assertions.
Safari, real iOS/Android hardware, authentication, API, and financial operations
remain unverified/unimplemented. No hosting, push, or deployment was performed.

## Layout correction: fullscreen and neutral dark mode

Critique: the capped 1040 px shell, outer padding, border, and rounded corners
made the desktop login look like a floating window. The dark surfaces also used
green across the entire page rather than keeping it as an accent.

Removed the outer frame and made the header, main columns, and footer fill the
viewport. Bounded only the preview's inner content to keep it readable on wide
screens. Dark surfaces/text/borders are now neutral charcoal/grays; green stays
on actions and progress. Browser chrome now matches the full-width header on
both desktop and phone, with no width-dependent color listener.

Re-review: inspected full-size light/dark desktop screenshots and phone dark
mode. The desktop shell measures x=0, y=0, width=1440, height=900 at a 1440×900
viewport, with no rounded frame. Dark backgrounds are RGB(28,29,33) and
RGB(36,38,43), removing the green cast. Oxlint, TypeScript, and all 12 Vitest
tests pass; Next MCP reports no compilation/runtime errors. Desktop/phone dark
axe checks report zero violations and incomplete checks. Safari and physical
phone verification remain pending; production build was not repeated for this
visual-only correction.

## Test migration: real Chromium and feature folders

Moved UI checks to Vitest Browser Mode using the documented Playwright provider
and `vitest-browser-react`. Shared launch/React settings live in
`@kivo/config/vitest/browser`; the web app keeps its test paths and native color
scheme command. Tests now live in `tests/auth` and `tests/appearance`, with small
files for each concern. Server rendering stays in a separate Node project.

Critique and fixes: browser assertions require `toMatchTextContent` for partial
text, and layout measurements must select the shell rather than next-themes'
script. Fixed both during migration. Native browser media emulation replaces
the old matchMedia mock. Appearance checks run serially because storage and OS
preference are shared; setup resets both between tests. Real CSS now guards the
fullscreen layout and horizontal overflow at desktop and phone widths.

Deleted the old setup, Jest DOM imports, simulated DOM utilities, and direct
Testing Library/jsdom dependencies. Regenerated dependency resolution to remove
stale optional peers, including jsdom and the old `@playwright/test` runner.
Re-review found no remaining legacy test setup or unused direct test package.
Vitest remains the sole runner; Next.js application code is unchanged.

Verification: all 13 tests (12 Chromium, one Node SSR) pass from both root and web
entrypoints. Oxlint, Oxfmt, TypeScript, Next production build, frozen offline
installation, and peer dependency checks pass. Firefox/WebKit, real phones, and
Next runtime browser QA were not repeated for this test-tooling change.

## Import conventions: aliases, groups, and type imports

Added the web `@/*` alias in its tsconfig and migrated source/test imports,
including route re-exports and CSS. Vitest uses native tsconfig path resolution
from the shared preset, keeping the alias mapping in one place. Workspace code
continues to use `@kivo/` package exports; no dependency was added.

Shared Oxfmt settings sort declarations by type, builtin, external, and internal
groups. Oxlint enforces separate type imports, alphabetized named imports, and
rejects relative imports/re-exports. A temporary lint probe confirmed that
sibling, parent, side-effect, and re-export paths are rejected, as are inline
type markers. Generated Next declarations remain excluded.

Critique: import sorting can change initialization order. Kept side-effect
sorting disabled and preserved renderer/font/CSS ordering. Re-review found no
relative source imports, duplicate alias mapping, or behavior changes.

Verification: all 13 Vitest tests, TypeScript, Oxlint, Oxfmt, and the Next
production build pass. Live Chromium checks loaded both routes and verified
stylesheet resolution and theme switching; Next MCP reported no compilation or
runtime errors. Firefox/WebKit and physical phones were not repeated.

## Formatter cleanup: four spaces and inherited ignores

Set shared Oxfmt `tabWidth` to four and reformatted the repository. Removed
duplicated exclusions for build output, coverage, generated Next declarations,
and the lockfile: Oxfmt already reads Git ignore rules and skips lockfiles.
Kept only the protected `.agents`, `.codex`, and `.aws` directories, which are
not Git-ignored here. Root and app formatter checks still cover the intended
files without traversing generated output.

Critique: reviewed the non-whitespace source diff; only JSX line wrapping
changed. No behavior or import order changed. Formatting and lint pass;
TypeScript and all 13 existing Vitest checks pass. Production build and manual
browser QA were not repeated for this formatting-only change.
