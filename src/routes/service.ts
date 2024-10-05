import express, { type Request, Response } from 'express';

import { getServices } from '../data';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const data = await getServices();

  res.json({ data: data.map(({ name }) => name) });
});

export default router;
