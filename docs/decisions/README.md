# Decisions

Keep durable project choices here with their reason, evidence and a condition for reconsidering them.

## Workspace foundation

The pnpm/Turbo workspace separates the Next.js app from shared UI and tooling. The application package stays `web` so filters, container paths and task names are stable; shared package scopes are configurable. Reconsider package boundaries when real consumers or ownership change.

Portable roles and skills live under `agents/`, with `AGENTS.md` as their entry point. They are human-readable procedures, not provider registrations. Hosts that reserve `.agents/` can still use this kit without changing their managed directory.

Site copy and metadata share one set of [site constants](../architecture/metadata.md), so the home page and document metadata use the same values.
