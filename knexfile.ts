import dotenv from 'dotenv';

dotenv.config({ path: './.env' });
// import { Config } from 'knex';

const config = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '3306', 10),
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    charset: 'utf8mb4',
  },
  migrations: {
    directory: './db/migrations',
    tableName: 'migrations',
  },
  seeds: {
    directory: './db/seeds',
  },
};

export default config;
