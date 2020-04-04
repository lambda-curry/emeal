import { Request, Response, Router } from 'express';
import { Project } from '../models/Project';
import { Coupon } from '../models/Coupon';
import asyncHandler from 'express-async-handler';
import { authenticateUser } from '../middleware/jwt';
import { PageView } from '../models/PageView';
import moment from 'moment';

export const router = Router().get(
  '/:projectId',
  authenticateUser,
  asyncHandler(getAnalyticsForProject)
);

async function getAnalyticsForProject(req: Request, res: Response) {
  const projectId = req.params.projectId;
  const project = await Project.findOne({
    _id: projectId,
    ownerId: req.user.id,
  });
  if (!project)
    return res
      .status(400)
      .json({ errors: [`Could not find project with id ${projectId}`] });

  const subscriberCount = await Coupon.count({
    projectId,
    createdAt: { $gt: moment().subtract(30, 'days').toDate() },
  });
  const redeemed30DayCount = await Coupon.count({
    projectId,
    createdAt: { $gt: moment().subtract(30, 'days').toDate() },
    redeemedDate: { $ne: null },
  });
  const subscriber30DayCount = await Coupon.count({
    projectId,
    createdAt: { $gt: moment().subtract(30, 'days').toDate() },
  });
  const pageViews30DayCount = await PageView.count({
    projectId,
    createdAt: { $gt: moment().subtract(30, 'days').toDate() },
  });
  return res.json({
    subscriberCount,
    redeemed30DayCount,
    subscriber30DayCount,
    pageViews30DayCount,
  });
}
