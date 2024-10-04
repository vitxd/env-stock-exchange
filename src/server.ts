import express from 'express';
import dotenv from 'dotenv';
import { Api, Web } from './routes';

dotenv.config();

const app = express();

app.use('/', Web);
app.use('/api', Api);

export default app;