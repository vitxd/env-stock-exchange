import express, { type Request, Response } from 'express';
import { ZodError } from 'zod';

import { findEnvByName, release, reserve } from '../data';
import EnvironmentAlreadyReservedError from '../exceptions/EnvironmentAlreadyReservedError';
import validateReserveRequest from '../middlewares/validateReserveRequest.middleware';
import { isEnvironmentAvailable } from '../service';
import {
  getEnvironments,
  releaseEnvironment,
  reserveEnvironment,
} from '../service/environments';
import { ReserveValidator } from '../validators';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  res.json({ data: getEnvironments() });
});

router.get('/:envName', (req: Request, res: Response) => {});

router.post('/release/:envName', async (req: Request, res: Response) => {
  const envName = req.params.envName;

  try {
    await releaseEnvironment(envName);
    res.status(204).json();
  } catch (e) {
    res.status(404).json();
  }
});

router.post(
  '/reserve/:envName',
  validateReserveRequest,
  async (_, res: Response) => {
    await reserveEnvironment(res.locals.env, res.locals.owner);

    res.status(201).json();
  },
);

export default router;
