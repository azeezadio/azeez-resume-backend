import { database } from './src/config/env.config';

const knexConfig = {
  client: database.client,
  connection: database.connection,
  pool: {
    min: database.pool.min,
    max: database.pool.max,
  },
  seeds: {
    directory: './src/database/seeds',
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './src/database/migrations',
  },
};

export default knexConfig;
