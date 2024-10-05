import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';

import morganMiddleware from './middlewares/morgan.middleware';
import { Api, Web } from './routes';

dotenv.config();

const app = express();

app.use(morganMiddleware);
app.use(bodyParser.json());

app.use('/', Web);
app.use('/api', Api);

export default app;
