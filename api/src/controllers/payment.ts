import { Router, Request, Response } from 'express';
import { authenticateUser } from '../middleware/jwt';
import asyncHandler from 'express-async-handler';
import * as yup from 'yup';
import { UserDocument } from '../models/User';
import { updateStripeCustomer } from '../services/stripe';

export const router = Router().put(
  '/updatePaymentInfo',
  authenticateUser,
  asyncHandler(updatePaymentMethod)
);

const updatePaymentMethodSchema = yup.object().shape({
  source: yup.string().required(),
});

async function updatePaymentMethod(req: Request, res: Response) {
  const user = req.user as UserDocument;
  const body = await updatePaymentMethodSchema.validate(req.body);
  const customer = await updateStripeCustomer(
    user.stripe?.customer?.id,
    body.source
  );
  await user.updateCustomer(customer).save();
  return res.json({ user: user.toDto() });
}
