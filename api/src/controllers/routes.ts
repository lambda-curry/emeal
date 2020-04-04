import { Router } from 'express';
import userRouter from './user';
import projectRouter from './project';
import authRouter from './auth';
import couponRouter from './coupon';
import analyticsRouter from './analytics';
import sessionRouter from './session';

export const apiRouter = Router();

apiRouter
  .get('/ping', (req, res) => res.json({ message: 'pong' }))
  .use(couponRouter)
  .use(authRouter)
  .use('/user', userRouter)
  .use('/session', sessionRouter)
  .use('/project', projectRouter)
  .use('/analytics', analyticsRouter);
