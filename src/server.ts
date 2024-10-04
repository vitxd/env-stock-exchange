import express from 'express';
import dotenv from 'dotenv';
import morganMiddleware from './middlewares/morgan.middleware';
import { Api, Web } from './routes';

dotenv.config();

const app = express();

app.use(morganMiddleware);
app.use('/', Web);
app.use('/api', Api);

export default app;