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

Open [the local preview](http://127.0.0.1:3000/) or
[the login route](http://127.0.0.1:3000/login).
Appearance defaults to the system and stores only `kivo.theme`. Both routes use
the same server-rendered page; the form and theme controls are client components.

## Shared tooling

[`@kivo/config`](packages/config/package.json) owns the common Oxlint, Oxfmt,
Vitest, and strict TypeScript configurations. Root entrypoints and app configs
consume those exports; app-specific settings stay outside the shared package.
Oxfmt also sorts Tailwind classes against the web stylesheet.
Formatting uses four spaces. Oxfmt reads `.gitignore` and skips lockfiles by
default; explicit exclusions cover the protected local tool directories only.

Use `@/` for imports from `apps/web/src` and `@kivo/` package exports across
workspace boundaries. The web tsconfig owns the alias; Next.js and Vitest both
resolve it. Shared Oxfmt settings alphabetize imports in groups: types, Node
built-ins, external packages, then internal modules. Side-effect imports retain
their execution order. Oxlint rejects relative imports, keeps type imports
separate, and checks named import ordering.

```sh
pnpm lint
pnpm typecheck
pnpm format:check
pnpm --filter @kivo/web exec playwright install chromium
pnpm test
pnpm build
```

`pnpm format` writes formatting changes. `pnpm test:watch` runs Vitest in watch
mode. `pnpm build` followed by `pnpm start` serves the production app at the default port 3000.
Type checking generates Next.js route types first, including on a fresh checkout.

Vitest is the only test runner. UI tests use its [Browser Mode](https://vitest.dev/guide/browser/)
with headless Chromium, the Playwright provider, and `vitest-browser-react`.
Install Chromium once with the command above. Playwright supplies browser
automation; it does not run a separate test suite. Vite and its React plugin
serve tests only; Next.js builds and serves the application.

Tests live under `apps/web/tests/<feature>/`, split by concern: form validation,
credential handling, dialogs, layout, and appearance. Shared browser settings
come from `@kivo/config/vitest/browser`; server-rendering checks use a separate
Node project. Browser Mode checks components with real CSS and native events,
but does not boot the Next.js server. Safari, real phones, and server-side
authentication remain outside this suite.

## Commits and hooks

`pnpm install` installs Husky through `prepare`. The pre-commit hook runs
`pnpm lint:staged`: Oxlint fixes staged source files, Oxfmt formats supported
staged files, then Vitest runs the full suite once. Tasks run serially so tests
see the final fixes. lint-staged handles re-staging, backups, and partially
staged files; do not add `git add` to tasks. Install Chromium as described above
before committing. Type checking and builds remain explicit checks.

The commit-msg hook uses commitlint with Conventional Commits:

```text
type(scope): imperative summary
```

Scopes are required and describe the affected workspace:

| Scope    | Use                                                         |
| -------- | ----------------------------------------------------------- |
| `web`    | `apps/web`, including its tests                             |
| `config` | Shared tooling in `packages/config`                         |
| `repo`   | Root tooling, documentation, or changes spanning workspaces |

Add a scope when introducing another app/package; use its short directory name.
Use `feat` for new behavior, `fix` for bugs, `refactor` for restructuring, `test`
for tests, `style` for formatting, `docs` for documentation, and `chore`, `build`,
or `ci` for maintenance. `perf` and `revert` are also supported. Keep the header
within 100 characters, start the summary with a lowercase verb, and omit its
final period. Mark breaking changes with `!` and explain them in a
`BREAKING CHANGE:` footer. Keep commits focused; describe verification in the
body when useful.

Examples: `feat(web): add shared goal progress`, `chore(config): update oxlint`,
and `docs(repo): clarify household privacy rules`.

`pnpm commitlint --from main --to HEAD` checks the branch history. Hooks are
local checks; no CI or release automation is configured yet.

## Product and agent guidance

- [Product scope and delivery plan](docs/plan.md)
- [Design direction and UI library research](docs/design.md)
- [Architecture, data model, and financial rules](docs/architecture.md)
- [Iteration critiques and changes](docs/reviews.md)
- [Agent workflow and repository skills](AGENTS.md)

The plan prioritizes family splitting and shared goals, followed by personal
expenses and budgets. EUR, English, and Europe/Lisbon are provisional defaults.
The existing [license](LICENSE) is preserved.
