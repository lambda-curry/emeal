import { Router } from 'express';
import { router as userRouter } from './user';
import { router as projectRouter } from './project';
import { router as authRouter } from './auth';
import { router as couponRouter } from './coupon';
import { router as analyticsRouter } from './analytics';
import { router as sessionRouter } from './session';
import { router as paymentRouter } from './payment';

export const apiRouter = Router();

apiRouter
  .get('/ping', (req, res) => res.json({ message: 'pong' }))
  .use(authRouter)
  .use('/coupon', couponRouter)
  .use('/user', userRouter)
  .use('/session', sessionRouter)
  .use('/project', projectRouter)
  .use('/analytics', analyticsRouter)
  .use('/payment', paymentRouter);
