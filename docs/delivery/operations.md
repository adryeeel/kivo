# Local containers and production setup

The local `compose.yml` builds the app from source. `compose.production.yml` runs a published image and is used by [CD](cd.md). Build and start the local standalone app from the repository root:

```bash
docker compose up --build --wait
# Open http://localhost:3000
docker compose down
```

Compose publishes on loopback. Set `PORT` for a different host port and `COMPOSE_PROJECT_NAME` for parallel instances. The app runs as an unprivileged user with a health check. The Docker builder installs the same pnpm version as the manifest; keep it and the Node images aligned when updating tooling.

`apps/web/src/const/site.ts` is consumed at build time. Rebuild the image after changing site preferences. No `.env` file, proxy network, image registry or production credentials are required for local Docker use.

For production deployment, follow [CD and secrets](cd.md). Configure domain, proxy and TLS for the target. Adding public assets also requires copying `apps/web/public` into the runtime image; create it when needed.

Use `agents/skills/delivery/scripts/docker-test.sh` for an isolated image/health smoke check when Docker is available. It creates and cleans up only its own resources.
