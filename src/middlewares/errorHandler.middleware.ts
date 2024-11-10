import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import { HttpException } from '../exceptions';

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('Error handler');

  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof HttpException) {
    res.status(err.status).json();

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
