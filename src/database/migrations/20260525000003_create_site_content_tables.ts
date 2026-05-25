import { Knex } from 'knex';

const withBaseColumns = (table: Knex.CreateTableBuilder, knex: Knex) => {
  table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
  table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.raw('NOW()'));
  table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(knex.raw('NOW()'));
  table.timestamp('deleted_at', { useTz: true }).nullable();
};

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('site_profiles', (table) => {
    withBaseColumns(table, knex);
    table.string('slug').notNullable().unique();
    table.string('full_name').notNullable();
    table.string('display_name').notNullable();
    table.text('headline').nullable();
    table.text('bio').nullable();
    table.string('location').nullable();
    table.string('email').nullable();
    table.string('linkedin_url').nullable();
    table.string('github_url').nullable();
    table.uuid('portrait_media_id').nullable().references('id').inTable('media_assets').onDelete('SET NULL');
    table.uuid('resume_media_id').nullable().references('id').inTable('media_assets').onDelete('SET NULL');
    table.jsonb('metadata').notNullable().defaultTo(knex.raw(`'{}'::jsonb`));
  });

  await knex.schema.createTable('homepage_sections', (table) => {
    withBaseColumns(table, knex);
    table.string('key').notNullable().unique();
    table.string('chapter').nullable();
    table.string('title').notNullable();
    table.text('subtitle').nullable();
    table.text('body').nullable();
    table.integer('sort_order').notNullable().defaultTo(0);
    table.boolean('is_active').notNullable().defaultTo(true);
    table.jsonb('metadata').notNullable().defaultTo(knex.raw(`'{}'::jsonb`));
  });

  await knex.schema.createTable('skill_groups', (table) => {
    withBaseColumns(table, knex);
    table.string('label').notNullable();
    table.jsonb('items').notNullable().defaultTo(knex.raw(`'[]'::jsonb`));
    table.integer('sort_order').notNullable().defaultTo(0);
    table.boolean('is_active').notNullable().defaultTo(true);
    table.jsonb('metadata').notNullable().defaultTo(knex.raw(`'{}'::jsonb`));
  });

  await knex.schema.createTable('experience_entries', (table) => {
    withBaseColumns(table, knex);
    table.string('years').notNullable();
    table.string('role').notNullable();
    table.string('company').notNullable();
    table.text('summary').nullable();
    table.integer('start_year').nullable();
    table.integer('end_year').nullable();
    table.integer('sort_order').notNullable().defaultTo(0);
    table.boolean('is_active').notNullable().defaultTo(true);
    table.jsonb('metadata').notNullable().defaultTo(knex.raw(`'{}'::jsonb`));
  });

  await knex.schema.createTable('recognition_entries', (table) => {
    withBaseColumns(table, knex);
    table.integer('year').notNullable();
    table.string('title').notNullable();
    table.string('organization').notNullable();
    table.text('description').nullable();
    table.uuid('media_id').nullable().references('id').inTable('media_assets').onDelete('SET NULL');
    table.integer('sort_order').notNullable().defaultTo(0);
    table.boolean('is_active').notNullable().defaultTo(true);
    table.jsonb('metadata').notNullable().defaultTo(knex.raw(`'{}'::jsonb`));
  });

  await knex.schema.createTable('talk_entries', (table) => {
    withBaseColumns(table, knex);
    table.string('date_label').notNullable();
    table.date('occurred_on').nullable();
    table.string('title').notNullable();
    table.string('venue').notNullable();
    table.text('summary').nullable();
    table.uuid('media_id').nullable().references('id').inTable('media_assets').onDelete('SET NULL');
    table.string('external_url').nullable();
    table.integer('sort_order').notNullable().defaultTo(0);
    table.boolean('is_active').notNullable().defaultTo(true);
    table.jsonb('metadata').notNullable().defaultTo(knex.raw(`'{}'::jsonb`));
  });

  for (const table of [
    'site_profiles',
    'homepage_sections',
    'skill_groups',
    'experience_entries',
    'recognition_entries',
    'talk_entries',
  ]) {
    await knex.raw(`
      CREATE TRIGGER ${table}_set_updated_at
      BEFORE UPDATE ON ${table}
      FOR EACH ROW EXECUTE FUNCTION set_updated_at();
    `);
  }

  await knex('articles').whereRaw("metadata ->> 'source' = 'website'").delete();
  await knex('memoir_entries').whereRaw("metadata ->> 'source' = 'website'").delete();
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('talk_entries');
  await knex.schema.dropTableIfExists('recognition_entries');
  await knex.schema.dropTableIfExists('experience_entries');
  await knex.schema.dropTableIfExists('skill_groups');
  await knex.schema.dropTableIfExists('homepage_sections');
  await knex.schema.dropTableIfExists('site_profiles');
}
