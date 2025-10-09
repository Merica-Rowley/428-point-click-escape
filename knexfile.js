// knexfile.js (CommonJS) — used by the Knex CLI which runs under Node
const dotenv = require('dotenv');

dotenv.config();

/**
 * Mirror of the TypeScript knexfile.ts config but exported as CommonJS
 * so `knex` CLI can load it without ts-node.
 */
const config = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    },
    migrations: {
      directory: './migrations',
    },
  },
};

module.exports = config;
