import { authenticateUser } from '../middleware/jwt';
import { Router, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Project } from '../models/Project';

export const router = Router()
  .use(authenticateUser)
  .get('', asyncHandler(getSession));

async function getSession(req: Request, res: Response) {
  const user = req.user;
  const projects = await Project.find({ ownerId: user.id });
  return res.json({
    session: {
      user: user.toDto(),
      projects: projects.map((p) => p.toDto()),
    },
  });
}
