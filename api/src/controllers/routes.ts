import { Router } from 'express';
import userRouter from './user';
import projectRouter from './project';
import authRouter from './auth';

export const apiRouter = Router();

apiRouter
  .get('/ping', (req, res) => res.json({ message: 'pong' }))
  .use(authRouter)
  .use('/user', userRouter)
  .use('/project', projectRouter);
