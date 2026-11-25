# Application structure

Use these boundaries when adding code to `apps/web/src`.

| Directory       | Owns                                    |
| --------------- | --------------------------------------- |
| `app/`          | Routes, layouts and metadata routes     |
| `parts/<page>/` | Page composition and its owned features |
| `components/`   | Components shared across page parts     |
| `hooks/`        | Hooks shared across page parts          |
| `const/`        | Application-wide configuration and copy |
| `tests/`        | Helpers and mocks shared across suites  |

Create directories when they acquire code. Routes render page parts; layouts own shared route setup. Each `parts/<page>/page.tsx` composes the page, with a public `index.ts` for route imports. The root layout imports the shared stylesheet and reads configured metadata and language.

Keep a page's features self-contained beneath its part. At each feature root, a named main component composes its child components, and `index.ts` only exports that main component. Put child components in the feature's `components/` directory. For example, `parts/login/form/login-form.tsx` composes its fields and help dialogs from `form/components/`; `parts/home/preview/family-preview.tsx` composes its summary, expense and goal from `preview/components/`. The form also owns its validation schema and tests. Page-level layout tests stay in `parts/login/tests/`. Shared controls remain in the UI package rather than being copied into a part.

Use `@/` for `src/`. Cross-part imports use the part's public API; feature components use direct imports within their owner. Add `const/`, `hooks/`, `helpers/`, `scripts/` or `tests/` only when that kind of file exists. Lazy imports may bypass a barrel when eager re-export would load deferred code. Tests can import constants or schemas directly to avoid loading unrelated modules.

Keep server components as the default and put client boundaries around browser behavior only. See [Code conventions](../quality/code.md) and [Test structure](../testing/structure.md).
