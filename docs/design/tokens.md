# Visual values

The shared stylesheet in `packages/ui/src/styles/global.css` supplies the shadcn Luma preset with emerald and mist tokens. Its `dark:` variant follows the class set by the [theme provider](../architecture/ui.md). The web app loads Public Sans for body text and Manrope for headings and the Kivo wordmark.

The home and login use neutral charcoal dark surfaces, with pale green reserved for actions and progress. Input borders and muted text are strengthened for readable controls and small labels. Shared controls default to 44 px targets; phone inputs stay at 16 px. The desktop login retains the historical preview-left/form-right composition, showing only the form below 1024 px. The home hero fits ordinary viewports, while short screens and enlarged text retain natural scrolling.

The header brand and desktop preview share a left gutter. The login form starts near the top on phones and stays centered vertically on desktop. Matching label-row heights keep field spacing consistent while preserving the recovery action's full tap target.

When a product identity is accepted, keep shared color, typography and spacing values in that stylesheet using Tailwind's theme mechanisms. Keep one-off layout values local to their component. Add theme styles when required, with checked contrast and consistent browser/server rendering.

Use existing Tailwind utilities before inventing arbitrary values. Let package formatting own class order. Record the reason for material visual constraints in [Brand](brand.md) or a decision when making changes.
