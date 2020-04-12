import { Router, Request, Response } from 'express';
import { authenticateUser } from '../middleware/jwt';
import asyncHandler from 'express-async-handler';
import * as yup from 'yup';
import {
  UserDocument,
  subscriptionDto,
  customerDto,
  stripeDto,
} from '../models/User';
import {
  updateStripeCustomer,
  cancelStripeSubscription,
  STRIPE_PLANS,
  createStripeSubscription,
  fetchStripeCustomer,
} from '../services/stripe';
import { EmealStripePlanId } from '@shared';

export const router = Router()
  .patch('', authenticateUser, asyncHandler(updatePaymentMethod))
  .post('/subscription', authenticateUser, asyncHandler(createSubscription))
  .post(
    '/subscription/cancel',
    authenticateUser,
    asyncHandler(cancelSubscription)
  );

const updatePaymentMethodSchema = yup.object().shape({
  tokenId: yup.string().required(),
});

const createSubscriptionSchema = yup.object().shape({
  tokenId: yup.string().required(),
  planId: yup.string().oneOf(STRIPE_PLANS).required(),
});

async function createSubscription(req: Request, res: Response) {
  const body = await createSubscriptionSchema.validate(req.body);
  const user = req.user as UserDocument;
  const customer = await fetchStripeCustomer(user.stripe?.customer?.id);
  if (!customer) {
    res.status(400).json({ errors: ['You do not have a stripe customer.'] });
  }
  const subscription = await createStripeSubscription(
    customer,
    body.planId as EmealStripePlanId
  );
  user.stripe.subscription = subscriptionDto(subscription);
  await user.save();
  return res.json({ user: user.toDto() });
}

async function updatePaymentMethod(req: Request, res: Response) {
  const user = req.user as UserDocument;
  const body = await updatePaymentMethodSchema.validate(req.body);
  const customer = await updateStripeCustomer(
    user.stripe?.customer?.id,
    body.tokenId
  );
  user.stripe.customer = customerDto(customer);
  await user.save();
  return res.json({ user: user.toDto() });
}

async function cancelSubscription(req: Request, res: Response) {
  const user = req.user as UserDocument;
  if (user.stripe.subscription) {
    const subscriptionId = user.stripe.subscription.id;
    const updatedSubscription = await cancelStripeSubscription(
      subscriptionId,
      true
    );
    user.stripe.subscription = subscriptionDto(updatedSubscription);
    await user.save();
  }
  return res.status(200).json({ user: user });
}
