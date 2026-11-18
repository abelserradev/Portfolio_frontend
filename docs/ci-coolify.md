# CI and Coolify deploy

## Local hooks

```bash
pre-commit install
pre-commit install --hook-type pre-push
```

Pre-commit: gitleaks + ESLint on staged `.ts`/`.tsx` files.  
Pre-push: `pnpm run lint && pnpm test` (entry uses `bash -c` so the chain stays intact on Windows).

## GitHub Actions

- **CI** — ESLint, Vitest, Next.js build, and `pnpm audit` on `main`, `develop`, `desarrollo`.
- **Deploy Coolify** — runs after a successful CI on `main`/`develop`, or via `workflow_dispatch`, on a **self-hosted** runner (`portfolio-coolify`) on the Coolify host.

### Self-hosted runner

Public `coolify.buildforge.work` returns Cloudflare 403 to GitHub-hosted runners. Deploy jobs therefore use:

- `runs-on: [self-hosted, linux, portfolio-coolify]`
- Local API: `http://127.0.0.1:8000/api/v1/deploy?uuid=<app>&force=false`

Server paths: `~/actions-runner-portfolio-frontend` (+ backend twin); start script `~/bin/start-portfolio-runners.sh` (`@reboot` crontab).

### Repository secrets

| Secret | Value |
|--------|--------|
| `COOLIFY_WEBHOOK_FRONTEND` | `http://127.0.0.1:8000/api/v1/deploy?uuid=<frontend-uuid>&force=false` |
| `COOLIFY_TOKEN` | Coolify API token with **deploy** permission (`Authorization: Bearer`) |

Do not commit the URL or token. Trailing CR/LF are stripped in the job (avoids curl exit 43).

## Avoid double deploys

Keep Coolify **Manual deployments only** / auto-deploy off when GitHub Actions triggers deploy after CI.
