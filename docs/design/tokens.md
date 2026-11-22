# Visual values

The shared stylesheet in `packages/ui/src/styles/global.css` supplies the shadcn Luma preset with emerald and mist tokens. Its `dark:` variant follows the class set by the [theme provider](../architecture/ui.md). The web app loads Public Sans for body text and Manrope for headings and the Kivo wordmark.

When a product identity is accepted, keep shared color, typography and spacing values in that stylesheet using Tailwind's theme mechanisms. Keep one-off layout values local to their component. Add theme styles when required, with checked contrast and consistent browser/server rendering.

Use existing Tailwind utilities before inventing arbitrary values. Let package formatting own class order. Record the reason for material visual constraints in [Brand](brand.md) or a decision when making changes.
