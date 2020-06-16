import { Router, Request, Response } from 'express';
import { router as userRouter } from './user';
import { router as projectRouter } from './project';
import { router as authRouter } from './auth';
import { router as couponRouter } from './coupon';
import { router as analyticsRouter } from './analytics';
import { router as sessionRouter } from './session';
import { router as paymentRouter } from './payment';
import { router as stripeWebhookRouter } from './stripe';
import mongoose from 'mongoose';

export const apiRouter = Router();

apiRouter
  .get('/ping', (req, res) => res.json({ message: 'pong' }))
  .get('/healthcheck', (req: Request, res: Response) => {
    if (mongoose.connection.readyState === 1) {
      return res.json({ message: 'healthy' });
    }
    return res.status(500).json({ message: 'mongoose connection unhealthy' });
  })
  .get('/error', (req, res) => {
    throw new Error('Boom! This is broken');
  })
  .use(authRouter)
  .use('/coupon', couponRouter)
  .use('/user', userRouter)
  .use('/session', sessionRouter)
  .use('/project', projectRouter)
  .use('/analytics', analyticsRouter)
  .use('/payment', paymentRouter)
  .use('/stripe', stripeWebhookRouter);
