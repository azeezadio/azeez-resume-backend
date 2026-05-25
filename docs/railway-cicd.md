# Railway CI/CD

This repository deploys to Railway through GitHub Actions.

## Required GitHub secret

Add this repository secret:

```text
RAILWAY_TOKEN
RAILWAY_PROJECT_ID
```

Use a Railway project token scoped to the `resume` project and `production`
environment. The token must not be committed to the repository.

`RAILWAY_PROJECT_ID` tells GitHub Actions which Railway project to deploy into.
The workflow cannot rely on a local `railway link` context because GitHub checks
out a fresh copy of the repository on every run.

Optional repository variables:

```text
RAILWAY_SERVICE=azeez-resume-backend
RAILWAY_ENVIRONMENT=production
```

## Deployment flow

On every push to `main`:

1. GitHub Actions installs dependencies with `yarn install --frozen-lockfile`.
2. It runs `yarn build`.
3. If the build passes, it installs the Railway CLI.
4. It deploys with `railway up` using the Railway project, service, and environment values.

Railway then uses `railway.toml`:

- Build command: `yarn install && yarn build`
- Pre-deploy migration: `knex migrate:latest`
- Start command: `node dist/src/server.js`
- Health check: `/api/v1/health`
