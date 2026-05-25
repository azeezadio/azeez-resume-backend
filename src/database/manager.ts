import knex, { Knex } from 'knex';
import { Model } from 'objection';
import knexConfig from '../../knexfile';

let db: Knex | null = null;

export function connectDatabase() {
  if (db) return db;

  db = knex(knexConfig);
  Model.knex(db);

  return db;
}

export async function closeDatabase() {
  if (!db) return;
  await db.destroy();
  db = null;
}
