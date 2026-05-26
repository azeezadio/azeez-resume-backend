import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('content_translations', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.raw('NOW()'));
    table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(knex.raw('NOW()'));
    table.timestamp('deleted_at', { useTz: true }).nullable();
    table.string('entity_type').notNullable();
    table.uuid('entity_id').notNullable();
    table.string('locale', 12).notNullable();
    table.string('field_key').notNullable();
    table.text('value_text').nullable();
    table.jsonb('value_json').nullable();
    table.string('source_hash').nullable();
    table.enu('status', ['machine', 'reviewed', 'stale']).notNullable().defaultTo('reviewed');

    table.unique(['entity_type', 'entity_id', 'locale', 'field_key']);
    table.index(['locale', 'entity_type', 'entity_id']);
    table.index(['entity_type', 'field_key']);
  });

  await knex.raw(`
    CREATE TRIGGER content_translations_set_updated_at
    BEFORE UPDATE ON content_translations
    FOR EACH ROW EXECUTE FUNCTION set_updated_at();
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('content_translations');
}
