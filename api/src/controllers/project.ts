import { Router, Request, Response } from 'express';
import { Project } from '@app/models/Project';
import { notAuthenticatedResponse } from '@app/middleware/jwt';

export const router = Router();
export const getUser = async (req: Request, res: Response) => {
  if (req.user) {
    const projects = await Project.find({ ownerId: req.user.id });
    return res.json({
      user: req.user.toDto(),
      projects: projects.map(p => p.toDto())
    });
  }
  return notAuthenticatedResponse(res);
};
