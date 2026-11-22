# Agent guide

Read [site constants](apps/web/src/const/site.ts) for site preferences. `apps/web` is the Next.js application, with package name **`web`**. Shared packages use `@project-template/*`; use the scope in current manifests.

## Find the relevant guidance

| Task                                      | Guide                                                                                                          |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Setup and commands                        | [Getting started](docs/getting-started.md)                                                                     |
| Place code and respect package boundaries | [Architecture](docs/architecture/README.md)                                                                    |
| UI work                                   | [Design](docs/design/README.md)                                                                                |
| Code, docs or review                      | [Code](docs/quality/code.md), [Documentation](docs/quality/documentation.md), [Review](docs/quality/review.md) |
| Tests                                     | [Testing](docs/testing/README.md)                                                                              |
| Performance                               | [Performance](docs/performance/README.md)                                                                      |
| Issues, branches, commits or PRs          | [Contributing](docs/contributing/README.md)                                                                    |
| CI or Docker                              | [Delivery](docs/delivery/README.md)                                                                            |
| Durable choices                           | [Decisions](docs/decisions/README.md)                                                                          |
| Roles and skills                          | [Agent workflows](docs/agents/README.md)                                                                       |

## Working rules

Run commands from the repository root unless stated otherwise. Follow `.node-version` and the pinned package manager. Read the touched code and its callers before changing it. Preserve unrelated work, prefer existing patterns, and add only the structure the task needs. Keep server components as the default.

Facts belong in configuration or `docs/`; portable roles and procedures live in `agents/`. Update references and guidance made inaccurate by a change. Use the [docs skill](agents/skills/docs/SKILL.md) when changing documentation or instructions. Use the `agents` commit scope for this file and the agent kit.

Work on a feature branch. Publication, merge and deployment follow the user's authorization and active runtime rules, which take precedence over repository procedures. Local work does not require an issue or PR unless requested.

Ordinary tasks need no team. When delegation is authorized, use bounded ownership and read only the selected role briefs and relevant skills. These files do not provision tools, select models or register agents.

Before handoff, follow the [completion assessment](docs/agents/README.md#completion-assessment). Report actual checks and remaining gaps; do not claim browser, CI or deployment success from compilation alone.
