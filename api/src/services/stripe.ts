/* eslint-disable @typescript-eslint/camelcase */
import { Stripe } from 'stripe';
import { UserDocument, customerDto } from '../models/User';
import { STRIPE_API_KEY, STRIPE_PLAN_ID } from '../util/secrets';

export type EmealStripePlanId =
  | 'emeal_basic'
  | 'emeal_pro'
  | 'emeal_restaurateur';
export const STRIPE_PLANS = ['emeal_basic', 'emeal_pro', 'emeal_restaurateur'];

const stripeClient = new Stripe(STRIPE_API_KEY, {
  protocol: 'https',
  apiVersion: '2020-03-02',
});

export async function fetchStripeCustomer(
  customerId: string
): Promise<Stripe.Customer> {
  const customer = await stripeClient.customers.retrieve(customerId, {
    expand: ['customer.default_source'],
  });
  if (customer.deleted) {
    return null;
  }
  return customer as Stripe.Customer;
}

export async function updateStripeCustomer(
  customerId: string,
  source: string
): Promise<Stripe.Customer> {
  return await stripeClient.customers.update(customerId, {
    source,
    expand: ['customer.default_source'],
  });
}

export async function createStripeCustomer(
  user: UserDocument
): Promise<Stripe.Customer> {
  return await stripeClient.customers.create({
    name: user.name,
    email: user.email,
    metadata: { id: user.id },
    expand: ['customer.default_source'],
  });
}

export async function fetchStripeSubscription(
  id: string
): Promise<Stripe.Subscription> {
  return await stripeClient.subscriptions.retrieve(id, {
    expand: ['customer', 'customer.default_source'],
  });
}

export async function createStripeSubscription(
  customer: Stripe.Customer,
  planId: EmealStripePlanId
): Promise<Stripe.Subscription> {
  return await stripeClient.subscriptions.create({
    customer: customer.id,
    items: [{ plan: planId, quantity: 1 }],
    trial_period_days: 14,
    expand: ['customer', 'customer.default_source'],
  });
}

export async function cancelStripeSubscription(
  subscriptionId: string,
  cancel: boolean
): Promise<Stripe.Subscription> {
  const update: Stripe.SubscriptionUpdateParams = {
    expand: ['customer.default_source'],
  };
  if (cancel != null) update.cancel_at_period_end = cancel;
  return await stripeClient.subscriptions.update(subscriptionId, update);
}
