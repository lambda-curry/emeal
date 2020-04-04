import { Request, Response, Router } from 'express';
import { Project } from '../models/Project';
import { Coupon, createCouponFromProject } from '../models/Coupon';
import * as yup from 'yup';
import { sendCouponEmail } from '../services/mail';
import asyncHandler from 'express-async-handler';
import moment from 'moment';

export const router = Router()
  .get('/:token', asyncHandler(getCouponByToken))
  .post('/:token/redeem', asyncHandler(redeemCouponByToken))
  .post('', asyncHandler(createCoupon));

const createCouponSchema = yup.object().shape({
  email: yup.string().email().required(),
  projectId: yup.string().required(),
});

async function getCouponByToken(req: Request, res: Response) {
  const token = req.params.token;
  const coupon = await Coupon.findOne({ token });
  if (!coupon)
    return res
      .status(404)
      .json({ errors: ['Could not find coupon for token'] });
  return res.json({ coupon: coupon.toDto() });
}

async function redeemCouponByToken(req: Request, res: Response) {
  const token = req.params.token;
  const coupon = await Coupon.findOne({ token });
  if (!coupon)
    return res
      .status(404)
      .json({ errors: ['Could not find coupon for token'] });
  if (coupon.redeemedDate)
    return res
      .status(400)
      .json({ errors: ['This coupon has already been redeemed'] });
  coupon.redeemedDate = moment().toDate();
  await coupon.save();
  return res.json({ coupon: coupon.toDto() });
}

async function createCoupon(req: Request, res: Response) {
  const body = await createCouponSchema.validate(req.body, {
    stripUnknown: true,
  });

  const project = await Project.findById(body.projectId);
  if (!project)
    return res
      .status(404)
      .json({ errors: [`Could not find project with id: ${body.projectId}`] });
  const existingCoupon = await Coupon.findOne({
    email: body.email,
    projectId: body.projectId,
  });
  if (existingCoupon)
    return res.status(400).json({
      errors: ['You have already received this coupon. Check your email!'],
    });
  const coupon = createCouponFromProject(body.email, project);
  await coupon.save();
  await sendCouponEmail(coupon);
  return res.status(200).json({ message: 'Email sent!' });
}
