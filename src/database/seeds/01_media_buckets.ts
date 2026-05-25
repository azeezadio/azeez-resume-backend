import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  const bucketName = process.env.BUCKET;
  const endpoint = process.env.ENDPOINT ?? process.env.S3_ENDPOINT ?? null;
  const region = process.env.REGION ?? process.env.S3_REGION ?? 'auto';
  const publicBucket = bucketName ?? process.env.S3_PUBLIC_BUCKET ?? 'resume-public';
  const privateBucket = bucketName ?? process.env.S3_PRIVATE_BUCKET ?? 'resume-private';

  const buckets = [
    {
      name: publicBucket,
      provider: 'railway',
      visibility: 'public',
      endpoint,
      region,
    },
  ];

  if (privateBucket !== publicBucket) {
    buckets.push({
      name: privateBucket,
      provider: 'railway',
      visibility: 'private',
      endpoint,
      region,
    });
  }

  await knex('media_buckets')
    .insert(buckets)
    .onConflict('name')
    .merge(['provider', 'visibility', 'endpoint', 'region']);
}
