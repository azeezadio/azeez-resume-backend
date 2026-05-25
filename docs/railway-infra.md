# Railway Infrastructure

The backend expects these Railway resources in the `resume` project,
`production` environment:

- App service: `azeez-resume-backend`
- Postgres service: `Postgres`
- Public media bucket: `resume-public`
- Private media bucket: `resume-private`

## Automated setup

Run from the backend repo:

```bash
chmod +x scripts/railway-setup-infra.sh
RAILWAY_PROJECT_NAME=resume \
RAILWAY_ENVIRONMENT_NAME=production \
RAILWAY_APP_SERVICE=azeez-resume-backend \
RAILWAY_POSTGRES_SERVICE=Postgres \
S3_PUBLIC_BUCKET=resume-public \
S3_PRIVATE_BUCKET=resume-private \
RAILWAY_BUCKET_REGION=iad \
./scripts/railway-setup-infra.sh
```

The script links the project, selects `production`, ensures Postgres exists,
and wires core app variables. If your Railway CLI exposes bucket commands, it
will also create the media buckets and connect credentials. If it does not,
finish the bucket setup from the Railway dashboard.

## Variables set on the app service

The script sets:

- `NODE_ENV=production`
- `APP_NAME=azeez-resume-backend`
- `API_PREFIX=/api/v1`
- `HOST=0.0.0.0`
- `DATABASE_URL=${{Postgres.DATABASE_URL}}`
- `S3_PUBLIC_BUCKET=resume-public`
- `S3_PRIVATE_BUCKET=resume-private`
- `S3_REGION=iad`
- `S3_FORCE_PATH_STYLE=true`
- `S3_ENDPOINT`
- `S3_ACCESS_KEY_ID`
- `S3_SECRET_ACCESS_KEY`

## Dashboard bucket setup

Use these steps when `railway bucket` is not available in your local CLI:

1. Open the `resume` project and `production` environment in Railway.
2. Create a public object storage bucket named `resume-public`.
3. Create a private object storage bucket named `resume-private`.
4. Copy the S3-compatible endpoint and access keys.
5. Add these variables to the `azeez-resume-backend` service:

```text
S3_ENDPOINT=<bucket endpoint>
S3_ACCESS_KEY_ID=<bucket access key>
S3_SECRET_ACCESS_KEY=<bucket secret key>
S3_PUBLIC_BUCKET=resume-public
S3_PRIVATE_BUCKET=resume-private
S3_REGION=iad
S3_FORCE_PATH_STYLE=true
```

Keep `DATABASE_URL` as a Railway reference so the app follows the Postgres
service automatically:

```text
DATABASE_URL=${{Postgres.DATABASE_URL}}
```

## Notes

Railway bucket credentials are S3-compatible. The app currently stores bucket
and asset metadata in Postgres; upload endpoints can be added next using the
same `media` module boundary.
