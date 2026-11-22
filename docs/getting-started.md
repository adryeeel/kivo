# Getting started

Use the Node major in [.node-version](../.node-version) and pnpm version pinned in [package.json](../package.json). Commands run from the repository root.

## Install and run

```bash
pnpm install
pnpm turbo run dev --filter=web
```

## Everyday commands

| Command                             | Purpose                                               |
| ----------------------------------- | ----------------------------------------------------- |
| `pnpm turbo run dev --filter=web`   | Start the app at http://localhost:3000                |
| `pnpm turbo run build --filter=web` | Build production standalone output                    |
| `pnpm --filter web start`           | Serve a production build                              |
| `pnpm fmt:check` / `pnpm fmt:fix`   | Check/fix files with their formatter configurations   |
| `pnpm lint:check` / `pnpm lint:fix` | Check/fix root files; use Turbo for package lint      |
| `pnpm turbo run type:check`         | Generate Next route types and check application types |
| `pnpm turbo run test:check`         | Run package tests                                     |

For the full CI sequence, run:

```bash
pnpm run ci
```

Before running browser suites, install Chromium with `pnpm --filter web exec playwright install chromium`; CI already installs it. See [Testing](testing/README.md).

`pnpm install` installs Husky hooks in a Git checkout. [Commits](contributing/commits.md#hooks) explains their behavior. Use package-owned configurations when formatting individual files; the root formatter and linter discover nested configurations; Turbo also runs package lint tasks.

## Containers

Use [Operations](delivery/operations.md) for local containers. Production deployment is opt-in; see [CD and secrets](delivery/cd.md).
