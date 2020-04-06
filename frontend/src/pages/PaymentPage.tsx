import React, { useState } from 'react';
import * as Stripe from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import './payment-page.scss';
import { useHistory } from 'react-router-dom';
import { post } from '../utils/api';

// Custom styling can be passed to options when creating an Element.
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: 'black',
      fontFamily: '"gilroy", sans-serif',
      fontSize: '16px',
      '::placeholder': {
        color: 'black',
      },
      iconColor: '#0068ff',
    },
    invalid: {
      color: '#ff4500',
      iconColor: 'darkred',
    },
  },
};

const CheckoutForm = () => {
  const [error, setError] = useState<string | null | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  // Handle real-time validation errors from the card Element.
  const handleChange = (event: Stripe.StripeCardElementChangeEvent) =>
    event.error ? setError(event.error.message) : setError(null);

  // POST the token ID to your backend.
  async function stripeTokenHandler(token: Stripe.Token | undefined) {
    if (!token) return;
    // TODO: hook up the correct payment endpoint
    const [response, error] = await post('/charge', { token: token.id });
    if (error) setError('An error occurred.');
    return response;
  }

  // Handle form submission.
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setSubmitting(true);
    event.preventDefault();

    if (!elements) {
      setSubmitting(false);
      return setError('An error occurred.');
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setSubmitting(false);
      return setError('An error occurred.');
    }

    const result = await stripe?.createToken(card);
    if (result?.error) {
      setSubmitting(false);
      setError(result.error.message);
    } else {
      setError(null);
      const response = await stripeTokenHandler(result?.token);
      if (!response) setError('An error occurred.');
      history.push('/dashboard');
    }
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <div className='form-field'>
        <CardElement options={CARD_ELEMENT_OPTIONS} onChange={handleChange} />
        <div className='form-input-error' role='alert'>
          {error}
        </div>
      </div>
      <div className='form-actions-right'>
        <button
          className='payment-form-submit'
          type='submit'
          disabled={submitting}
        >
          {submitting ? 'Saving...' : 'Save Payment Method'}
        </button>
      </div>
    </form>
  );
};

// Setup Stripe.js and the Elements provider
const stripePromise = Stripe.loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

export const PaymentPage = () => {
  return (
    <div className='page payment'>
      <div className='page-container'>
        <div className='page-item'>
          <h2 className='payment-title'>ADD PAYMENT METHOD</h2>
          <p className='payment-content'>
            You won't be charged until your free trial ends.
          </p>
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
  );
};
