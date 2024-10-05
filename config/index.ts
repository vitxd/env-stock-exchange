import dotenv from 'dotenv';

dotenv.config();

export const config = {
  database: {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  debug: 'true' === process.env.DEBUG || false,
};
