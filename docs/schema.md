# Content Schema

## Articles

Articles are long-form public entries. They are archived by `year` and `month`
so the frontend can build `/articles/2026/05/...` views without deriving dates
at query time.

Core fields:

- `slug`
- `title`
- `excerpt`
- `body`
- `status`
- `year`
- `month`
- `published_at`
- `cover_media_id`
- `seo_title`
- `seo_description`
- `metadata`

## Memoir Entries

Memoir entries are dated personal/contextual entries. They are also archived by
`year` and `month`, with optional `occurred_on`, `location`, and `mood`.

## Media Buckets

`media_buckets` stores bucket references and visibility. Railway buckets expose
S3-compatible credentials; this table stores the application-facing bucket
names and metadata, not secrets.

## Media Assets

`media_assets` stores object keys and metadata for uploaded files. Assets can
belong to:

- `article`
- `memoir`
- `profile`
- `standalone`

This lets articles and memoir entries share a single media library while still
supporting profile/hero images.
