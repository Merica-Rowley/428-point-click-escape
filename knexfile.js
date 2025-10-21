const dotenv = require('dotenv');
dotenv.config();

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

  production: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL, // Use Render database URL
      ssl: { rejectUnauthorized: false },         // Required for Render
    },
    migrations: {
      directory: './migrations',
    },
  },
};

module.exports = config;
