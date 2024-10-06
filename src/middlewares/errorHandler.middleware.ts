import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import ResourceNotFoundError from '../exceptions/ResourceNotFoundError';

function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof ResourceNotFoundError) {
    res.status(404).json();

    return;
  }

  if (err instanceof ZodError) {
    res.status(422).json({
      error: err.errors.map((el) => ({
        field: el.path[0],
        message: el.message,
      })),
    });

    return;
  }

  res.status(500).json({ error: err });
}

export default errorHandler;
