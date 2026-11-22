# CD and deployment secrets

[cd.yml](../../.github/workflows/cd.yml) deploys only after the `CI` workflow succeeds for a push to `master`, and only when the repository variable `DEPLOY_ENABLED` is exactly `true`. Draft PRs, PR CI runs, failed CI and manual CI runs do not deploy. The workflow must exist on the default branch for GitHub to receive `workflow_run` events. No deployment runs until the owner opts in and configures a server.

The publish job checks out the exact CI commit and pushes `ghcr.io/<owner>/<repo>/web:<commit-sha>` using GitHub's automatically provided `GITHUB_TOKEN` with package write permission. The deploy job checks that `master` still points at that SHA, copies [compose.production.yml](../../compose.production.yml), authenticates the server to GHCR and starts that exact image with `docker compose up -d --wait`. Deployment runs are serialized; health-check failures fail the job. The check fails if `master` has already advanced. It happens before the file copy and SSH deployment, so a later push can still arrive before deployment finishes. There is no automatic rollback or automatic image cleanup.

## GitHub settings

Create a `production` GitHub Actions environment. Put credentials in its environment secrets and non-secret server settings in its environment variables. Add environment reviewers or branch restrictions if the project requires them. Repository-level secrets and variables can also be used. `DEPLOY_ENABLED` must be a **repository** variable because the publish job does not use the production environment. Set it to `true` only after configuring and verifying the target.

| Name                  | Location                      | Purpose                                                                                                                                    |
| --------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `DEPLOY_ENABLED`      | Repository variable           | Set to `true` to enable publishing and deployment.                                                                                         |
| `DEPLOY_PATH`         | Production variable           | Absolute, dedicated directory on the server for the Compose file.                                                                          |
| `DEPLOY_PROJECT`      | Production variable           | Unique Compose project name; use lowercase letters, digits, hyphens or underscores, starting with a letter or digit.                       |
| `VPS_SSH_USERNAME`    | Production variable           | SSH user with access to the directory and Docker.                                                                                          |
| `VPS_SSH_PORT`        | Production variable, optional | SSH port; defaults to `22`.                                                                                                                |
| `GHCR_READ_USERNAME`  | Production variable           | GitHub account allowed to read the package.                                                                                                |
| `VPS_SSH_HOST`        | Production secret             | Server hostname or IP address.                                                                                                             |
| `VPS_SSH_KEY`         | Production secret             | Dedicated SSH private key whose public key is authorized for the deployment user.                                                          |
| `VPS_SSH_FINGERPRINT` | Production secret             | Verified SHA256 host-key fingerprint, obtained through a trusted channel.                                                                  |
| `GHCR_READ_TOKEN`     | Production secret             | Classic GitHub personal access token with `read:packages` for an account allowed to read the GHCR package; authorize SSO where applicable. |

`GITHUB_TOKEN` is provided automatically; do not create a personal token for the publish job. Ensure the workflow has permission to publish packages and the read account can access the package. The server uses a temporary Docker config for login, removed after the SSH command exits. Do not put private keys, tokens or application secrets in the Compose file, image, repository, logs or Docker build arguments.

## Server and operation

Install Docker and the Compose plugin on the target, authorize the SSH key and prepare the dedicated `DEPLOY_PATH`. The SSH user must be able to write there and run Docker. Compose publishes port 3000 on loopback by default; arrange a reverse proxy, domain and TLS separately. Set `PORT` in a server-side `.env` in that directory to change the host port. Add application runtime secrets through an appropriate server-side secret mechanism if the application needs them; they are not supplied by this workflow. Site constants are compiled into the image.

Before enabling deployment, verify the host key fingerprint independently, package access, environment settings and the [local container smoke test](operations.md). On a failed rollout, inspect the workflow and container health. To roll back, explicitly authorize the operation, then on the server change to `DEPLOY_PATH` and export `IMAGE_REF` with a previously published SHA-tagged image and `DEPLOY_PROJECT` with the configured project name. Authenticate the server for the pull as needed, then run:

```bash
docker compose --project-name "$DEPLOY_PROJECT" -f compose.production.yml up -d --wait
```

The explicit project name prevents an existing `COMPOSE_PROJECT_NAME` from targeting a different deployment. Check health and the application afterward. Rollback is a separate operator action; this workflow has no rollback input.
