import type { Knex } from "knex";
import * as dotenv from "dotenv";

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL + "?ssl=true",
    migrations: {
      directory: "./migrations",
    },
  },
};

export default config; // 👈 important