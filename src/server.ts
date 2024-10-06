import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';

import errorHandler from './middlewares/errorHandler.middleware';
import morganMiddleware from './middlewares/morgan.middleware';
import { Api, Slack, Web } from './routes';

dotenv.config();

const app = express();

app.use(morganMiddleware);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(errorHandler);

app.use('/', Web);
app.use('/api', Api);
app.use('/slack', Slack);

export default app;
