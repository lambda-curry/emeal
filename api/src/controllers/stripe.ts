import { Router, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Stripe from 'stripe';
import { User, stripeDto } from '../models/User';
import { fetchStripeSubscription } from '../services/stripe';
import { Project } from '../models/Project';
import moment from 'moment';

export const router = Router().post('/webhook', asyncHandler(webhook));

async function webhook(req: Request, res: Response) {
  const event = req.body;
  let subscription: Stripe.Subscription;

  switch (event) {
    case 'customer.subscription.updated':
      subscription = event.data.object as Stripe.Subscription;
      await updateCustomerSubscription(subscription.id);
      return res.status(200).json({ message: 'Received' });
    case 'customer.subscription.deleted':
      subscription = event.data.object as Stripe.Subscription;
      await cancelCustomerSubscription(subscription.id);
      return res.status(200).json({ message: 'Received' });
    default:
      return res.status(200).json({ message: 'Received' });
  }
}

async function cancelCustomerSubscription(subscriptionId: string) {
  const subscription = await fetchStripeSubscription(subscriptionId);
  if (subscription.status === 'canceled') {
    const customer = subscription.customer as Stripe.Customer;
    const userId = customer.metadata.id;
    const user = await User.findById(userId);
    user.stripe.subscription = null;
    await user.save();
    const project = await Project.findOne({ ownerId: user.id });
    project.disabledAt = moment().toDate();
    await project.save();
  }
}

async function updateCustomerSubscription(subscriptionId: string) {
  const subscription = await fetchStripeSubscription(subscriptionId);
  const customer = subscription.customer as Stripe.Customer;
  const userId = customer.metadata.id;
  const user = await User.findById(userId);
  user.stripe = stripeDto(customer, subscription);
  await user.save();
}
