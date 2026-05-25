# Railway CI/CD

This repository deploys to Railway through GitHub Actions.

## Required GitHub secret

Add this repository secret:

```text
RAILWAY_TOKEN
```

Use a Railway project token scoped to the `resume` project and `production`
environment. The token must not be committed to the repository.

## Deployment flow

On every push to `main`:

1. GitHub Actions installs dependencies with `yarn install --frozen-lockfile`.
2. It runs `yarn build`.
3. If the build passes, it installs the Railway CLI.
4. It deploys with `railway up --detach`.

Railway then uses `railway.toml`:

- Build command: `yarn install && yarn build`
- Pre-deploy migration: `knex migrate:latest`
- Start command: `node dist/src/server.js`
- Health check: `/api/v1/health`
