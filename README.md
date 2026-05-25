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

- Structured portfolio site content for profile, homepage sections, skills, experience, recognition, and talks.
- Articles grouped by year and month, with publishing state and SEO metadata.
- Memoir entries grouped by year and month, with event dates and reflective content.
- Bucket references for Railway object storage or any S3-compatible provider.
- Media assets linked to articles, memoir entries, or standalone profile content.

## Railway

Railway runs:

```bash
yarn install && yarn build
yarn db:migrate && yarn db:seed
node dist/src/server.js
```

Health check:

```text
/api/v1/health
```

## Content Migration

The editorial website content is seeded into Postgres during Railway pre-deploy:

- Profile, homepage sections, skills, career history, recognition, and talks are stored in dedicated site tables.
- Articles and memoir entries are kept as empty future content modules.
- Website images and resume PDF are stored as `media_assets` metadata.

Upload the current website media files into the connected Railway bucket from a
local shell that is logged in to Railway:

```bash
railway run --service resume --environment production yarn media:upload
```
