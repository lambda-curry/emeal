import Stripe from 'stripe';
import { UserDocument } from '../models/User';

const stripeClient = new Stripe('', {
  protocol: 'https',
  apiVersion: '2020-03-02',
});

export async function createStripeCustomer(user: UserDocument) {
  const customer = await stripeClient.customers.create({
    name: user.name,
    email: user.email,
    metadata: { id: user.id },
  });
}
