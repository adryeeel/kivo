# Delivery

[CI](ci.md) describes repository checks; [CD and secrets](cd.md) explains image publishing, server deployment and required settings. [Operations](operations.md) covers local containers, and [Pipeline changes](changes.md) covers verification.

Configuration is authoritative: `.github/workflows/`, `apps/web/Dockerfile`, `compose.yml`, `compose.production.yml` and `turbo.json`. CD is opt-in and has no configured server or credentials.

Local checks and read-only inspection do not authorize deployment or secret changes. Carry forward authorization already given for a concrete action and target.
