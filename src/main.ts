import express from 'express';
import dotenv from 'dotenv';
import { Api, Web } from './routes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use('/', Web);
app.use('/api', Api);

app.listen(port, () => {
    console.log('Server running');
});