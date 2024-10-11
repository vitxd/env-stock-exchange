import express from 'express';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const router = express.Router();

router.get('/', (_, res) => {
  const html = readFileSync(
    path.resolve(__dirname, '../../frontend/index.html'),
    'utf-8',
  );
  res.header('Content-Type', 'text/html').send(html);
});

router.get('/main.css', (_, res) => {
  const css = readFileSync(
    path.resolve(__dirname, '../../frontend/main.css'),
    'utf-8',
  );
  res.header('Content-Type', 'text/css').send(css);
});

router.get('/main.js', (_, res) => {
  const js = readFileSync(
    path.resolve(__dirname, '../../frontend/main.js'),
    'utf-8',
  );
  res.header('Content-Type', 'application/javascript').send(js);
});

export default router;
