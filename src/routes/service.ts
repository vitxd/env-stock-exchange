import express, { type Request, Response } from 'express';

import { listServices } from '../service/services';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  res.json({ data: listServices() });
});

export default router;
