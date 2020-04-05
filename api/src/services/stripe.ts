import Stripe from 'stripe';
import { UserDocument } from '../models/User';
import { STRIPE_API_KEY, STRIPE_PLAN_ID } from '../util/secrets';

const stripeClient = new Stripe(STRIPE_API_KEY, {
  protocol: 'https',
  apiVersion: '2020-03-02',
});

export async function createStripeCustomer(user: UserDocument) {
  return await stripeClient.customers.create({
    name: user.name,
    email: user.email,
    metadata: { id: user.id },
  });
}

export async function createStripeSubscription(
  customer: Stripe.Customer,
  quantity: number
) {
  return await stripeClient.subscriptions.create({
    customer: customer.id,
    items: [{ plan: STRIPE_PLAN_ID, quantity }],
  });
}
