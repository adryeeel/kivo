# Code conventions

Read [Application structure](../architecture/application.md) for placement and [UI package](../architecture/ui.md) for boundaries.

## Components and data

Give components one recognizable responsibility. Extract a part when its markup, state or behavior makes the parent harder to follow. Do not extract a prop-forwarding wrapper or split a file to satisfy a line count. Prefer existing code, native HTML/CSS and installed dependencies before adding new code or libraries.

Use named function components and local `interface Props`; default exports are for framework entry points. Top-level helpers and hooks use function declarations. Use arrow functions for nested callbacks and handlers; keep nested function declarations only when their behavior requires them. Review this convention when changing code. Keep server components as the default and mark the smallest browser boundary with `'use client'`.

Keep feature copy and content settings in named objects under `const/` when a separate concern needs an owner. A trivial one-off value can remain inline. Do not create speculative options, empty directories or single-use abstractions.

## Styles and imports

Use Tailwind classes at the element; the shared stylesheet owns global foundations. No class-merging utility or component library is preinstalled. Add one only when actual composition requires it. Use inline styles for computed values rather than static styling.

The shared linter owns import, export and object ordering. Imports group external packages, workspace packages, `@/`, feature modules, parent and sibling files. Side-effect imports retain their position. Run the package fixer rather than reproducing the sort manually.

Separate statements doing different jobs with blank lines. Comments explain constraints or reasons the code cannot show. Preserve validation, accessibility and error handling when moving code. Add focused regression coverage for meaningful logic; use [Testing](../testing/README.md) to choose the runner.
