import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'yup';
import logger from '../util/logger';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!error) return next();
  if (error instanceof ValidationError) {
    return res.status(400).json({ errors: (error as ValidationError).errors });
  }
  logger.error('Uncaught error', error);
  return res.status(500).json({ errors: ['Internal Server Error'] });
};
