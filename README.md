# Kivo

Private personal finances and a shared family space for expenses, settling up,
and saving toward common goals. A web application designed for phones first.

`apps/web` runs Next.js App Router with Tailwind CSS, Base UI, and `next-themes`.
The login is a frontend preview: it validates locally and never sends or stores
credentials. The API and real authentication remain planned.

## Run locally

Use Node.js 24–26 and pnpm 12.14.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open [the local preview](http://127.0.0.1:4173/) or
[the login route](http://127.0.0.1:4173/login).
Appearance defaults to the system and stores only `kivo.theme`. Both routes use
the same server-rendered page; the form and theme controls are client components.

## Shared tooling

[`@kivo/config`](packages/config/package.json) owns the common Oxlint, Oxfmt,
Vitest, and strict TypeScript configurations. Root entrypoints and app configs
consume those exports; app-specific settings stay outside the shared package.
Oxfmt also sorts Tailwind classes against the web stylesheet.

```sh
pnpm lint
pnpm typecheck
pnpm format:check
pnpm test
pnpm build
```

`pnpm format` writes formatting changes. `pnpm test:watch` runs Vitest in watch
mode. `pnpm build` followed by `pnpm start` serves the production app at port 4173.
Type checking generates Next.js route types first, including on a fresh checkout.

Vitest is the only test runner. It covers form behavior, the theme-provider
integration, hydration, and server rendering; tests run without downloading a
browser. Vite is not an app dependency or build tool here, but remains an internal
dependency of Vitest. There is no Playwright configuration or test runner.
Responsive layout and accessibility are also checked in a real local browser;
Safari, real phones, and server-side authentication are not verified by these
component tests.

## Product and agent guidance

- [Product scope and delivery plan](docs/plan.md)
- [Design direction and UI library research](docs/design.md)
- [Architecture, data model, and financial rules](docs/architecture.md)
- [Iteration critiques and changes](docs/reviews.md)
- [Agent workflow and repository skills](AGENTS.md)

The plan prioritizes family splitting and shared goals, followed by personal
expenses and budgets. EUR, English, and Europe/Lisbon are provisional defaults.
The existing [license](LICENSE) is preserved.
