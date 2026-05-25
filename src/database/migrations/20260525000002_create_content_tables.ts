import { Knex } from 'knex';

const withBaseColumns = (table: Knex.CreateTableBuilder, knex: Knex) => {
  table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
  table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.raw('NOW()'));
  table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(knex.raw('NOW()'));
  table.timestamp('deleted_at', { useTz: true }).nullable();
};

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('media_buckets', (table) => {
    withBaseColumns(table, knex);
    table.string('name').notNullable().unique();
    table.string('provider').notNullable().defaultTo('railway');
    table.enu('visibility', ['public', 'private']).notNullable().defaultTo('private');
    table.string('endpoint').nullable();
    table.string('region').nullable();
    table.jsonb('metadata').notNullable().defaultTo(knex.raw(`'{}'::jsonb`));
  });

  await knex.schema.createTable('media_assets', (table) => {
    withBaseColumns(table, knex);
    table.uuid('bucket_id').notNullable().references('id').inTable('media_buckets').onDelete('RESTRICT');
    table.enu('owner_type', ['article', 'memoir', 'profile', 'standalone']).notNullable();
    table.uuid('owner_id').nullable();
    table.string('storage_key').notNullable();
    table.string('public_url').nullable();
    table.string('mime_type').notNullable();
    table.string('file_name').notNullable();
    table.bigInteger('file_size').nullable();
    table.integer('width').nullable();
    table.integer('height').nullable();
    table.text('alt_text').nullable();
    table.text('caption').nullable();
    table.jsonb('metadata').notNullable().defaultTo(knex.raw(`'{}'::jsonb`));
    table.unique(['bucket_id', 'storage_key']);
    table.index(['owner_type', 'owner_id']);
  });

  await knex.schema.createTable('articles', (table) => {
    withBaseColumns(table, knex);
    table.string('slug').notNullable().unique();
    table.string('title').notNullable();
    table.text('excerpt').nullable();
    table.text('body').notNullable();
    table.uuid('cover_media_id').nullable().references('id').inTable('media_assets').onDelete('SET NULL');
    table.enu('status', ['draft', 'scheduled', 'published', 'archived']).notNullable().defaultTo('draft');
    table.integer('year').notNullable();
    table.integer('month').notNullable();
    table.timestamp('published_at', { useTz: true }).nullable();
    table.string('seo_title').nullable();
    table.text('seo_description').nullable();
    table.jsonb('metadata').notNullable().defaultTo(knex.raw(`'{}'::jsonb`));
    table.index(['year', 'month']);
    table.index(['status', 'published_at']);
  });

  await knex.schema.createTable('memoir_entries', (table) => {
    withBaseColumns(table, knex);
    table.string('slug').notNullable().unique();
    table.string('title').notNullable();
    table.text('summary').nullable();
    table.text('body').notNullable();
    table.integer('year').notNullable();
    table.integer('month').notNullable();
    table.date('occurred_on').nullable();
    table.string('location').nullable();
    table.string('mood').nullable();
    table.uuid('cover_media_id').nullable().references('id').inTable('media_assets').onDelete('SET NULL');
    table.enu('status', ['draft', 'scheduled', 'published', 'archived']).notNullable().defaultTo('draft');
    table.timestamp('published_at', { useTz: true }).nullable();
    table.jsonb('metadata').notNullable().defaultTo(knex.raw(`'{}'::jsonb`));
    table.index(['year', 'month']);
    table.index(['status', 'published_at']);
  });

  for (const table of ['media_buckets', 'media_assets', 'articles', 'memoir_entries']) {
    await knex.raw(`
      CREATE TRIGGER ${table}_set_updated_at
      BEFORE UPDATE ON ${table}
      FOR EACH ROW EXECUTE FUNCTION set_updated_at();
    `);
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('memoir_entries');
  await knex.schema.dropTableIfExists('articles');
  await knex.schema.dropTableIfExists('media_assets');
  await knex.schema.dropTableIfExists('media_buckets');
}
