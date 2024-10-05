import express from 'express';
import dotenv from 'dotenv';
import morganMiddleware from './middlewares/morgan.middleware';
import { Api, Web } from './routes';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();

app.use(morganMiddleware);
app.use(bodyParser.json());

app.use('/', Web);
app.use('/api', Api);

export default app;