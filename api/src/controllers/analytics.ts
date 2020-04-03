import { Request, Response, Router } from 'express';
import { Project } from '../models/Project';
import { Coupon } from '../models/Coupon';
import asyncHandler from 'express-async-handler';
import { jwtMiddleware } from '../middleware/jwt';

export default jwtMiddleware(Router()).get(
  '/:projectId',
  asyncHandler(getAnalyticsForProject)
);

async function getAnalyticsForProject(req: Request, res: Response) {
  const projectId = req.params.projectId;
  const project = await Project.findOne({
    _id: projectId,
    ownerId: req.user.id
  });
  if (!project)
    return res
      .status(400)
      .json({ errors: [`Could not find project with id ${projectId}`] });

  const count = await Coupon.count({ projectId });
  const redeemedCount = await Coupon.count({ projectId })
    .where('redeemedDate')
    .ne(null);
  return res.json({ count, redeemedCount });
}
