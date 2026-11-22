# Application structure

Use these boundaries when adding code to `apps/web/src`.

| Directory          | Owns                                    |
| ------------------ | --------------------------------------- |
| `app/`             | Routes, layouts and metadata routes     |
| `features/<name>/` | A feature's implementation and sections |
| `components/`      | Components shared across features       |
| `hooks/`           | Hooks shared across features            |
| `const/`           | Application-wide configuration and copy |
| `tests/`           | Helpers and mocks shared across suites  |

Create directories when they acquire code. Routes render features; layouts own shared route setup. `features/home` is the minimal example: a public `index.ts` exports `HomePage` from `page.tsx`. The root layout imports the shared stylesheet and reads configured metadata and language.

Features can contain `sections/`. A section or shared component exposes a public `index.ts` and implements its named component in a matching file. Add `components/`, `const/`, `hooks/`, `helpers/`, `scripts/` or `tests/` only when that kind of file exists. Keep parts local to their owner. A distinct helper, hook or constant concern gets its kind's folder from its first file.

Use `@/` for `src/`. Cross-feature imports use the feature's public API. Lazy imports may bypass a barrel when eager re-export would load deferred code. Tests can import constants directly to avoid loading unrelated modules.

Keep server components as the default and put client boundaries around browser behavior only. See [Code conventions](../quality/code.md) and [Test structure](../testing/structure.md).
