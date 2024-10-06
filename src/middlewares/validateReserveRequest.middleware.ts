import type { NextFunction, Request, Response } from 'express';

import { findEnvByName } from '../data';
import EnvironmentAlreadyReservedError from '../exceptions/EnvironmentAlreadyReservedError';
import ResourceNotFoundError from '../exceptions/ResourceNotFoundError';
import { isEnvironmentAvailable } from '../service';
import { ReserveValidator } from '../validators';

const validateReserveRequest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const env = await findEnvByName(req.params.envName);

  if (env === undefined) {
    throw new ResourceNotFoundError();
  }

  ReserveValidator.parse(req.body);

  if (!isEnvironmentAvailable(env)) {
    throw new EnvironmentAlreadyReservedError({
      environment: env.name,
      owner: env.owner as string,
    });
  }

  res.locals.env = env;
  res.locals.owner = req.body.name;

  next();
};

export default validateReserveRequest;
