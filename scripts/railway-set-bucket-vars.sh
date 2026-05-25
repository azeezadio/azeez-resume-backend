#!/usr/bin/env bash
set -euo pipefail

APP_SERVICE="${RAILWAY_APP_SERVICE:-resume}"
ENDPOINT="${ENDPOINT:-${S3_ENDPOINT:-}}"
REGION="${REGION:-${S3_REGION:-auto}}"
BUCKET="${BUCKET:-${S3_PUBLIC_BUCKET:-}}"
ACCESS_KEY_ID="${ACCESS_KEY_ID:-${S3_ACCESS_KEY_ID:-}}"
SECRET_ACCESS_KEY="${SECRET_ACCESS_KEY:-${S3_SECRET_ACCESS_KEY:-}}"

require_value() {
  if [ -z "$2" ]; then
    echo "Missing $1" >&2
    exit 1
  fi
}

require_value ENDPOINT "$ENDPOINT"
require_value BUCKET "$BUCKET"
require_value ACCESS_KEY_ID "$ACCESS_KEY_ID"
require_value SECRET_ACCESS_KEY "$SECRET_ACCESS_KEY"

railway variable set \
  ENDPOINT="$ENDPOINT" \
  REGION="$REGION" \
  BUCKET="$BUCKET" \
  ACCESS_KEY_ID="$ACCESS_KEY_ID" \
  SECRET_ACCESS_KEY="$SECRET_ACCESS_KEY" \
  S3_ENDPOINT="$ENDPOINT" \
  S3_REGION="$REGION" \
  S3_PUBLIC_BUCKET="$BUCKET" \
  S3_PRIVATE_BUCKET="$BUCKET" \
  S3_ACCESS_KEY_ID="$ACCESS_KEY_ID" \
  S3_SECRET_ACCESS_KEY="$SECRET_ACCESS_KEY" \
  S3_FORCE_PATH_STYLE=true \
  --service "$APP_SERVICE"

echo "Bucket variables set on ${APP_SERVICE}."
