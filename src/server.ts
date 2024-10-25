import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';

import errorHandler from './middlewares/errorHandler.middleware';
import morganMiddleware from './middlewares/morgan.middleware';
import { Api, Slack } from './routes';

dotenv.config();

const app = express();

app.use(morganMiddleware);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(errorHandler);

app.use(express.static('public'));

app.use('/api', Api);
app.use('/slack', Slack);

app.use((req, res, next) => {
  res.status(404).json();
});

export default app;
