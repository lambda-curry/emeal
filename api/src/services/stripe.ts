import Stripe from 'stripe';

const stripeClient = new Stripe('', {
  protocol: 'https',
  apiVersion: '2020-03-02',
});
