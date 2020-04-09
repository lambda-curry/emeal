import React, { useState } from 'react';
import * as Stripe from '@stripe/stripe-js';
import { CardElement } from '@stripe/react-stripe-js';
import { ErrorMessage, useField } from 'formik';

// Custom styling can be passed to options when creating an Element.
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: 'black',
      fontFamily: '"gilroy", sans-serif',
      fontSize: '18px',
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

export const CardFieldWrapper = ({ name }: { name: string }) => {
  const [field, , helpers] = useField({ name });
  const [cardDetails, setCardDetails] = useState<
    Stripe.StripeCardElementChangeEvent
  >();

  const { onBlur, onChange, value } = field;
  const { setError, setValue } = helpers;

  const handleChange = (event: Stripe.StripeCardElementChangeEvent) => {
    onChange(name);
    setValue(event.complete);
    helpers.setTouched(false);
    setCardDetails(event);

    if (event.error) setError(event.error.message);
  };

  const handleBlur = () => onBlur({ target: { name, value } });

  return (
    <div className='form-field'>
      <CardElement
        options={CARD_ELEMENT_OPTIONS}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      {cardDetails?.error?.message ? (
        <div className='form-input-error'>{cardDetails.error.message}</div>
      ) : (
        <ErrorMessage
          className='form-input-error'
          name={name}
          component='div'
        />
      )}
    </div>
  );
};
