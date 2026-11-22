# Architecture

`apps/web` owns the Next.js application and is named **`web`**. Shared packages use `@project-template/*`. Workspace membership and dependency versions live in [pnpm-workspace.yaml](../../pnpm-workspace.yaml); package manifests own dependencies and scripts.

| Task                             | Guide                                   |
| -------------------------------- | --------------------------------------- |
| Place application code           | [Application structure](application.md) |
| Add shared UI                    | [UI package](ui.md)                     |
| Change site identity or metadata | [Metadata](metadata.md)                 |

The app consumes shared styles and providers from `packages/ui`. Formatter, linter, TypeScript and Vitest packages retain shared configuration. Add reusable UI there when needed and declare its dependencies and exports explicitly.

Turbo task dependencies and output caching live in [turbo.json](../../turbo.json). See [CI](../delivery/ci.md) when changing task behavior.
