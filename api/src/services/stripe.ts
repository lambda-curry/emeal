/* eslint-disable @typescript-eslint/camelcase */
import { Stripe } from 'stripe';
import { UserDocument } from '../models/User';
import { STRIPE_API_KEY, STRIPE_PLAN_ID } from '../util/secrets';

const stripeClient = new Stripe(STRIPE_API_KEY, {
  protocol: 'https',
  apiVersion: '2020-03-02',
});

export async function updateStripeCustomer(
  customerId: string,
  source: string
): Promise<Stripe.Customer> {
  return await stripeClient.customers.update(customerId, { source });
}

export async function createStripeCustomer(
  user: UserDocument
): Promise<Stripe.Customer> {
  return await stripeClient.customers.create({
    name: user.name,
    email: user.email,
    metadata: { id: user.id },
  });
}

export async function createStripeSubscription(
  customer: Stripe.Customer,
  quantity: number
): Promise<Stripe.Subscription> {
  return await stripeClient.subscriptions.create({
    customer: customer.id,
    items: [{ plan: STRIPE_PLAN_ID, quantity }],
    trial_period_days: 14,
  });
}

export async function updateStripeSubscription(
  subscriptionId: string,
  quantity?: number,
  cancel?: boolean
): Promise<Stripe.Subscription> {
  const update: Stripe.SubscriptionUpdateParams = {};
  if (quantity != null) update.items = [{ plan: STRIPE_PLAN_ID, quantity }];
  if (cancel != null) update.cancel_at_period_end = cancel;

  return await stripeClient.subscriptions.update(subscriptionId, update);
}
