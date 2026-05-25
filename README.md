# Azeez Resume Backend

Restana + TypeScript backend for the resume site content system.

## Structure

- `src/config` - environment and runtime configuration
- `src/database` - Knex migrations and seeds
- `src/models` - Objection models
- `src/repositories` - database access boundaries
- `src/modules` - route/controller/service/validation feature modules
- `src/shared` - common types, middleware, logger, errors, response helpers

## Domain

The first schema supports:

- Articles grouped by year and month, with publishing state and SEO metadata.
- Memoir entries grouped by year and month, with event dates and reflective content.
- Bucket references for Railway object storage or any S3-compatible provider.
- Media assets linked to articles, memoir entries, or standalone profile content.

## Railway

Railway runs:

```bash
yarn install && yarn build
node -r ts-node/register -r tsconfig-paths/register ./node_modules/.bin/knex migrate:latest --knexfile knexfile.ts
node dist/src/server.js
```

Health check:

```text
/api/v1/health
```
