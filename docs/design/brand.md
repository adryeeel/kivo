# Brand and voice

Kivo's intended product is a mobile-first family finance app for sharing expenses and goals while keeping personal finances private. See [Product](../product/README.md) for the current scope. Its tone is clear, calm and approachable.

## Identity

The selected Balance mark uses two mirrored forms separated by a narrow space. They suggest people contributing as equals while retaining their own space. This is an intended interpretation, not a claim about what every viewer will see.

The mark is available in [SVG](../../apps/web/public/brand/kivo-mark.svg). Render the name as text beside it in Manrope. The app also supplies browser and Apple touch icons.

The Balance mark and browser icons use emerald-700 (`#007a55`), matching the light action color. Dark actions use emerald-400 with dark foreground text for contrast. The browser icon uses a white mark on a green tile so it stays visible on dark tabs. Shared color values live in the [theme stylesheet](../../packages/ui/src/styles/global.css). Do not rely on color alone to convey financial status.

[Site constants](../../apps/web/src/const/site.ts) supply the configured name and description. The [design workflow](workflow.md) guides future design decisions.
