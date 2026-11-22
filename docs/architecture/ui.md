# UI package

`packages/ui` owns reusable UI shared with the application. Application-specific composition stays in the app; see [Application structure](application.md).

Before using or extending the package, inspect its [manifest](../../packages/ui/package.json) for current exports, dependencies and scripts. Follow the export targets to inspect available APIs and defaults, including icons and providers.

Consume shared UI through declared package exports. Public paths can differ from the source layout and TypeScript aliases. Add shared components under `src/components/` when needed, and use an existing wildcard export when it covers the new module; otherwise declare a suitable public path in the manifest.

Keep shared third-party UI dependencies in this package. Declare runtime dependencies here and consumer contracts in peer dependencies where appropriate. Follow [Code conventions](../quality/code.md) when deciding whether a dependency or wrapper is needed.

When changing shared styles, providers or packaging, check the consuming app's [layout](../../apps/web/src/app/layout.tsx) and [Next.js configuration](../../apps/web/next.config.ts) for affected imports, provider setup and transpilation settings. Verify public imports from the consuming app, since an internal alias alone does not establish a working package export.

Follow [Design](../design/README.md) for accessibility and visual decisions, including accessible names for icon-only controls. Choose checks using [Testing](../testing/README.md) and the package's current configuration.

## shadcn CLI

The app and UI package have matching `components.json` files for the Base Luma preset, with Lucide icons. Run `pnpm dlx shadcn@latest add <component> -c apps/web` to route shared primitives into `packages/ui/src/components/primitive` and import them through paths such as `@kivo/ui/primitive/button`. The preset uses emerald theme tokens in the shared stylesheet; the app uses `next/font/google` for Public Sans and Manrope. Reapplying a preset may overwrite the font setup or icon library, so check both workspace configurations and the app layout afterward.
