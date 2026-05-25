# Content Schema

## Site Content

The current portfolio website is modeled separately from future writing
features. The frontend should read the editorial homepage from `/api/v1/site`.

Core tables:

- `site_profiles` - identity, headline, contact links, portrait, and resume.
- `homepage_sections` - hero/about/skills/experience/recognition/talks/contact section copy.
- `skill_groups` - grouped skill labels and item arrays.
- `experience_entries` - career timeline entries.
- `recognition_entries` - awards and recognition, with optional media.
- `talk_entries` - talks and press items, with optional media.

## Articles

Articles are a future long-form writing module. They are archived by `year` and `month`
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

Memoir entries are a future dated personal/contextual writing module. They are also archived by
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
