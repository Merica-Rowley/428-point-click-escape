// knexfile.ts
import type { Knex } from "knex";
import * as dotenv from "dotenv";

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    },
    migrations: {
      directory: "./migrations",
    },
  },
};

export default config; // 👈 important

// Quick test for commits

