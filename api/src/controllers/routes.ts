import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import * as userController from './user';
import * as mailController from './mail';
import { jwtMiddleware } from '../middleware/jwt';
import { updateProject, getProjects } from './project';

export const apiRouter = Router();

apiRouter
  .get('/ping', (req, res) => res.json({ message: 'pong' }))
  .post('/login', asyncHandler(userController.postLogin))
  .get('/logout', asyncHandler(userController.logout))
  .post('/forgotPassword', asyncHandler(userController.forgotPassword))
  .post('/reset/:token', asyncHandler(userController.resetPassword))
  .post('/signup', asyncHandler(userController.signup))
  .post('/testMail', asyncHandler(mailController.sendTestMail))
  .use(
    jwtMiddleware(Router())
      .get('/user', asyncHandler(userController.getUser))
      .put('/user/updatePassword', asyncHandler(userController.updatePassword))
      .put('/project', asyncHandler(updateProject))
      .get('/project', asyncHandler(getProjects))
  );
