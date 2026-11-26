# Visual values

The shared stylesheet in `packages/ui/src/styles/global.css` supplies the shadcn Luma preset with emerald and mist tokens. Its `dark:` variant follows the class set by the [theme provider](../architecture/ui.md). The web app loads Public Sans for body text and Manrope for headings and the Kivo wordmark.

The home and login use near-black green dark surfaces, with emerald reserved for actions and progress. Light actions and the brand mark use emerald-700; dark actions use emerald-400 with dark text. The favicon keeps a white mark on emerald-700 in both themes. Input borders and muted text are strengthened for readable controls. Shared controls default to 44 px targets; phone inputs stay at 16 px.

The home hero uses one borderless household preview on a plain page surface. Generous padding and thin separators divide the header, monthly summary, recent expense and savings goal. The goal uses the shared progress label, value and a rounded background track with distinct filled and unfilled colors. The hero pairs its copy and action with the family preview on desktop, stacking them in reading order on phones. The hero fits a 1440 × 900 desktop viewport; phones, short screens and enlarged text retain natural scrolling. The shared page shell has no footer. The login contains only the form, centered on larger screens and starting higher on phones. Essential supporting text is at least 14 px. Matching label-row heights keep field spacing consistent while preserving the recovery action's full tap target.

When a product identity is accepted, keep shared color, typography and spacing values in that stylesheet using Tailwind's theme mechanisms. Keep one-off layout values local to their component. Add theme styles when required, with checked contrast and consistent browser/server rendering.

Use existing Tailwind utilities before inventing arbitrary values. Let package formatting own class order. Record the reason for material visual constraints in [Brand](brand.md) or a decision when making changes.

A single shared preview banner in `SiteShell` explains the sample data and unavailable account actions on every page. Page copy, metadata and navigation use their intended product wording; action feedback reports unavailability without repeating preview explanations. Remove the shared banner when the product is ready.
