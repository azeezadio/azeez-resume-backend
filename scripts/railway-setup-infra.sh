#!/usr/bin/env bash
set -euo pipefail

PROJECT_NAME="${RAILWAY_PROJECT_NAME:-resume}"
PROJECT_SELECTOR="${RAILWAY_PROJECT_ID:-${PROJECT_NAME}}"
ENVIRONMENT_NAME="${RAILWAY_ENVIRONMENT_NAME:-production}"
APP_SERVICE="${RAILWAY_APP_SERVICE:-resume}"
POSTGRES_SERVICE="${RAILWAY_POSTGRES_SERVICE:-Postgres}"
PUBLIC_BUCKET="${S3_PUBLIC_BUCKET:-resume-public}"
PRIVATE_BUCKET="${S3_PRIVATE_BUCKET:-resume-private}"
BUCKET_REGION="${RAILWAY_BUCKET_REGION:-iad}"

require() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "Missing required command: $1" >&2
    exit 1
  fi
}

require railway

has_bucket_cli() {
  railway bucket --help >/dev/null 2>&1
}

service_exists() {
  railway service status --all --json | grep -Eq "\"name\"[[:space:]]*:[[:space:]]*\"$1\""
}

echo "Linking Railway project: ${PROJECT_SELECTOR}"
railway link --project "${PROJECT_SELECTOR}"

echo "Selecting Railway environment: ${ENVIRONMENT_NAME}"
railway environment "${ENVIRONMENT_NAME}"

echo "Current Railway context:"
railway status --json

echo "Ensuring Postgres service exists."
if ! service_exists "${POSTGRES_SERVICE}"; then
  railway add --database postgres --service "${POSTGRES_SERVICE}"
else
  echo "Postgres service '${POSTGRES_SERVICE}' already exists."
fi

if ! service_exists "${APP_SERVICE}"; then
  echo "App service '${APP_SERVICE}' was not found."
  echo "Create or connect the app service in Railway, then re-run this script." >&2
  exit 1
fi

echo "Setting app service variables."
railway variable set \
  NODE_ENV=production \
  APP_NAME=azeez-resume-backend \
  API_PREFIX=/api/v1 \
  HOST=0.0.0.0 \
  DATABASE_URL="\${{${POSTGRES_SERVICE}.DATABASE_URL}}" \
  S3_PUBLIC_BUCKET="${PUBLIC_BUCKET}" \
  S3_PRIVATE_BUCKET="${PRIVATE_BUCKET}" \
  S3_REGION="${BUCKET_REGION}" \
  S3_FORCE_PATH_STYLE=true \
  --service "${APP_SERVICE}"

if has_bucket_cli; then
  echo "Ensuring public bucket exists: ${PUBLIC_BUCKET}"
  if ! railway bucket list --environment "${ENVIRONMENT_NAME}" --json | grep -q "\"name\":\"${PUBLIC_BUCKET}\""; then
    railway bucket create "${PUBLIC_BUCKET}" --region "${BUCKET_REGION}" --environment "${ENVIRONMENT_NAME}" --json
  else
    echo "Bucket '${PUBLIC_BUCKET}' already exists."
  fi

  echo "Ensuring private bucket exists: ${PRIVATE_BUCKET}"
  if ! railway bucket list --environment "${ENVIRONMENT_NAME}" --json | grep -q "\"name\":\"${PRIVATE_BUCKET}\""; then
    railway bucket create "${PRIVATE_BUCKET}" --region "${BUCKET_REGION}" --environment "${ENVIRONMENT_NAME}" --json
  else
    echo "Bucket '${PRIVATE_BUCKET}' already exists."
  fi

  echo "Fetching public bucket credentials."
  PUBLIC_CREDS="$(railway bucket credentials --bucket "${PUBLIC_BUCKET}" --environment "${ENVIRONMENT_NAME}" --json)"

  echo "Wiring public bucket credentials to app service."
  railway variable set \
    S3_ENDPOINT="$(node -e "console.log(JSON.parse(process.argv[1]).endpoint)" "${PUBLIC_CREDS}")" \
    S3_ACCESS_KEY_ID="$(node -e "console.log(JSON.parse(process.argv[1]).accessKeyId)" "${PUBLIC_CREDS}")" \
    S3_SECRET_ACCESS_KEY="$(node -e "console.log(JSON.parse(process.argv[1]).secretAccessKey)" "${PUBLIC_CREDS}")" \
    --service "${APP_SERVICE}"
else
  echo "This Railway CLI does not expose bucket commands."
  echo "Create '${PUBLIC_BUCKET}' and '${PRIVATE_BUCKET}' from the Railway dashboard,"
  echo "then set S3_ENDPOINT, S3_ACCESS_KEY_ID, and S3_SECRET_ACCESS_KEY on '${APP_SERVICE}'."
fi

echo "Infra setup complete."
railway service status --all --json
