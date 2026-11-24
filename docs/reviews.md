## Dependabot update grouping

Grouped version and security updates separately for each configured ecosystem,
keeping the existing schedules and commit settings. Critique: grouping can make
major changes harder to isolate; all versions remain eligible and each PR still
needs review. The YAML parses and its six group rules were checked locally;
Dependabot's hosted execution can only be verified after the change is merged.

## Dependabot conventions

Matched Yel’s assignee, label, cooldown, branch names, directory discovery, and version grouping while retaining separate security groups. Confirmed Kivo has the `build` label. YAML checks cover each ecosystem; hosted Dependabot execution remains to be verified after merge.

## Home hero and validated login preview

Built from the current workspace foundation, preserving the historical login's desktop preview-left/form-right layout and phone form-only layout. Composed official shadcn Base Luma primitives and the login-02 block with the current Balance brand and fonts. The home now explains the planned product and links to `/login`. RHF/Zod validates locally; preview input names remain absent from native form data, including before hydration. The schema stays local until a real API consumer needs shared contracts; see [the decision](decisions/README.md#login-validation-and-future-contracts). Attribution is retained in [third-party notices](../THIRD_PARTY_NOTICES.md).

Critique and fixes: shared primitives initially lacked generated Tailwind styles, so the shared stylesheet now scans their source. Strengthened input boundaries and muted text after a contrast finding. Independent review caught a press transition targeting the wrong CSS property and stale metadata guidance; both are corrected. Enlarged-text QA exposed intrinsic heading and help-button widths; wrapping fixes now preserve access at 200% text, with four regression cases. The independent reviewer found no credential or authentication-boundary blocker.

Verification: 27 real Chromium tests cover schema rules, validation/focus, password visibility, dialog close/Escape/reduced motion, no credential requests/storage/native serialization, responsive layouts and enlarged text. Live Next checks confirmed real fonts, direct routes and hero navigation, normal viewport fit at 320/390/768/1440 px, safe native submission with scripts blocked, and keyboard focus restoration. Home/login page audits in both themes reported zero axe violations; a modal contrast result remained incomplete due to an overlap heuristic, with readable settled text inspected manually. Safari, physical phones and assistive-technology testing remain pending. Authentication, API, persistence and financial behavior remain unimplemented; this is a frontend preview.

The combined workspace CI command passes formatting, lint, type checks, all 27 tests and the production build. Frozen offline installation and local documentation links also pass. The existing formatter peer-range warning is unchanged: `@kivo/oxfmt` requests `^0.74.0` while the workspace installs `0.79.0`; formatting itself passes.

## Refine the existing login and appearance control

Kept the palette, pill controls, content and desktop split. Aligned the header brand with the preview gutter and cropped empty SVG canvas around the unchanged Balance paths so the mark aligns with the wordmark. The phone form now starts higher, both label rows have consistent spacing, and the recovery action retains a clear 44 px target without overlapping its input.

Replaced the three theme buttons with one labeled shadcn menu, exclusive choices and a selected checkmark. Selection persists through the existing provider, closes the menu and restores focus. Its short transition originates at the trigger and reduces to opacity when requested. Removed the unused toggle primitives. Independent review found no material issue in this refinement.

All 30 Chromium tests pass, including new appearance selection/persistence, keyboard/Escape/focus and enlarged-menu cases, plus recovery/input target clearance. Live Next checks confirm the refined placement and both themes; desktop and phone/menu axe checks report zero violations. The open-menu audit leaves focus-guard and ARIA relationship checks incomplete; keyboard focus and the referenced popup ID were checked manually. Safari, physical phones and screen readers remain unverified. Authentication is unchanged and remains a preview.

## Self-contained page parts

Moved home and login into `parts/<page>/`, with login's form owning its fields, dialogs, schema and tests, and its preview owning the summary, expense and goal. Updated route imports, import sorting and the architecture guide. Independent review found no material issue. All 30 Chromium tests pass; live Next checks confirm both help dialogs, submission feedback, feedback clearing on edit, nameless inputs and the desktop/phone layout without runtime or compilation errors. Physical-device and Safari checks were not repeated.
