import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  await knex('media_buckets')
    .insert([
      {
        name: process.env.S3_PUBLIC_BUCKET ?? 'resume-public',
        provider: 'railway',
        visibility: 'public',
      },
      {
        name: process.env.S3_PRIVATE_BUCKET ?? 'resume-private',
        provider: 'railway',
        visibility: 'private',
      },
    ])
    .onConflict('name')
    .ignore();
}
