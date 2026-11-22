# CI and task caching

[ci.yml](../../.github/workflows/ci.yml) runs checks for ready pull requests, pushes to `master` and manual dispatch. Draft pull requests skip the check job; marking a PR ready starts it, and converting it back to draft cancels an in-progress run. One job installs the pinned Node/pnpm environment and Chromium, then runs `pnpm run ci` for formatting, root lint and Turbo checks. It requires no repository secrets or remote Turbo account. Checks cover root formatting/lint, package tasks, types and the production build. The shared test configuration permits packages with no test files; a pass alone does not establish coverage. Add tests for meaningful behavior and require test files where a package needs a suite.

CI checks the whole workspace. Use `pnpm turbo run <task> --affected` locally when Git history supports it; introduce affected-only CI after its benefit and path selection are verified. Root scripts have their own responsibilities and are not selected automatically as package tasks.

Turbo caches outputs and task results according to [turbo.json](../../turbo.json). Lint, type and test tasks depend on a `transit` task so dependency changes invalidate consumers. Markdown is excluded from lint, test and build inputs, but remains an input for formatting and type checking. Site constants are included in the web package inputs, so changes invalidate its build.

No remote cache is configured. Add remote caching through authorized account configuration rather than putting credentials in tracked files. A passing Next build does not prove Docker packaging or a production deployment. Successful `master` push runs can trigger [CD](cd.md) when explicitly enabled.
