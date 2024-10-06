import dotenv from 'dotenv';

dotenv.config();

export const config = {
  database: {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  slackApp: {
    signingSecret: process.env.SLACK_SIGNING_SECRET || '',
    token: process.env.SLACK_BOT_TOKEN,
  },
  debug: 'true' === process.env.DEBUG || false,
};
