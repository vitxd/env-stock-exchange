import express, { type Request, Response } from 'express';

import { createImage, listServices } from '../service/services';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  res.json({ data: listServices() });
});

router.post('/:serviceName/image', async (req: Request, res: Response) => {
  const { image } = req.body;
  const { serviceName } = req.params;

  await createImage(serviceName, image);

  res.status(201).json();
});

export default router;
