import { NextFunction, Request, Response, Router } from 'express';
import { User } from '../models/User';
import jwt from 'jwt-simple';
import logger from '../util/logger';
import moment from 'moment';
import { AUTH_SECRET } from '../util/secrets';

export const notAuthenticatedResponse = (res: Response) => {
  return res
    .status(401)
    .json({ errors: ['Please login to access this resource'] });
};

const attachUser = async (req: Request, res: Response, next: NextFunction) => {
  const jwtString = req?.cookies?.jwt;
  if (!jwtString) return notAuthenticatedResponse(res);
  try {
    const parsedJwt = jwt.decode(jwtString, AUTH_SECRET);
    if (moment(parsedJwt?.exp).isBefore(moment()))
      return res.status(401).json({ errors: ['JWT expired. Please login.'] });
    const user = await User.findById(parsedJwt.sub);
    if (!user) throw new Error('User not found');
    req.user = user;
    return next();
  } catch (err) {
    logger.warn(err);
    return notAuthenticatedResponse(res);
  }
};
export const jwtMiddleware = (router: Router) => router.use(attachUser);
