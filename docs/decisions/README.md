# Decisions

Keep durable project choices here with their reason, evidence and a condition for reconsidering them.

## Workspace foundation

The pnpm/Turbo workspace separates the Next.js app from shared UI and tooling. The application package stays `web` so filters, container paths and task names are stable; shared package scopes are configurable. Reconsider package boundaries when real consumers or ownership change.

Portable roles and skills live under `agents/`, with `AGENTS.md` as their entry point. They are human-readable procedures, not provider registrations. Hosts that reserve `.agents/` can still use this kit without changing their managed directory.

[Site constants](../architecture/metadata.md) provide document metadata. Feature components own their visible copy; the visible wordmark is owned by the `Brand` component.

## Login validation and future contracts

React Hook Form and Zod handle the frontend preview's validation. Its schema stays in the login form feature because no API consumes it. It trims email input and preserves passwords exactly; signing in does not impose signup strength rules. Preview DOM inputs deliberately have no names so native submissions cannot serialize credentials before hydration.

Show validation errors only after a submit attempt. Editing a field clears its error and invalid state; typing and blur do not create new errors, including after a failed submission. Recheck the full schema on every submit and focus the first invalid field. Clearing feedback does not mark a field valid or bypass schema validation. This lets people finish or correct their input without being interrupted by errors for incomplete values.

Introduce a browser-safe contracts package when a real API and web consumer need the same public schema. Share request/response validation and inferred types, keeping presentation rules in web and authorization/database rules in API. The planned Better Auth integration owns authentication endpoints; the preview schema is not its authoritative contract. Reconsider the schema library with the first API slice, including Fastify validation and serialization; adding Zod for a form does not select the API's validation library. [shadcn RHF guide](https://ui.shadcn.com/docs/forms/react-hook-form), [Fastify type providers](https://fastify.dev/docs/latest/Reference/Type-Providers/).

Implementation and validation history: [PR #14](https://github.com/adryeeel/kivo/pull/14).
