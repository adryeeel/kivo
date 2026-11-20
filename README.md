# Kivo

Private personal finances and a shared family space for expenses, settling up,
and saving toward common goals. A web application designed for phones first.

The first frontend slice is implemented in `apps/web`: a responsive login page,
a family-space preview, and light/dark/system appearance. The pnpm workspace is
ready for additional applications. The API and real authentication are not
implemented yet; the form validates locally and never sends or stores credentials.

## Run locally

Use Node.js 24–26 and pnpm 12.14.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the printed Vite URL at `/` or `/login`. The theme defaults to your system
and remembers explicit changes; only `kivo.theme` is stored locally.

## Checks

```sh
pnpm lint
pnpm typecheck
pnpm format:check
pnpm build
pnpm --filter @kivo/web exec playwright install chromium
pnpm test
```

Browser tests cover desktop and mobile Chromium. Optional Safari-engine checks
use `pnpm --filter @kivo/web test:webkit` after installing Playwright WebKit and
its host libraries. WebKit could not launch on this machine because `libicu74`
and compatible `libxml2` dependencies are missing. Real-phone testing is pending.

## Product and agent guidance

- [Product scope and delivery plan](docs/plan.md)
- [Design direction, wireframes, and UI library research](docs/design.md)
- [Architecture, data model, and financial rules](docs/architecture.md)
- [Iteration critiques and changes](docs/reviews.md)
- [Agent workflow and repository skills](AGENTS.md)

The plan prioritizes family splitting and shared goals, followed by personal
expenses and budgets. Proposed defaults are EUR, English, and Europe/Lisbon;
these are assumptions to validate before onboarding real households.

The existing [license](LICENSE) is preserved.
