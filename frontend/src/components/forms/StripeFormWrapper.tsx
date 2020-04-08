import React, { FunctionComponent, ReactElement } from 'react';
import * as Stripe from '@stripe/stripe-js';
import {
  Elements,
  useElements,
  CardElement,
  useStripe,
} from '@stripe/react-stripe-js';
import { FormWrapper } from './FormWrapper';
import { FormikProps, FormikConfig, FormikHelpers } from 'formik';
import { post } from '../../utils/api';

const StripeFormWrapperContent: FunctionComponent<
  FormikConfig<any> & {
    className?: string;
    validationSchema: any;
    children: (formikProps: FormikProps<any>) => ReactElement;
  }
> = (props) => {
  const elements = useElements();
  const stripe = useStripe();
  const {
    children,
    className,
    onSubmit,
    validationSchema,
    ...formikConfig
  } = props;

  const handleSubmit = async (
    values: any,
    formikHelpers: FormikHelpers<any>
  ) => {
    const { setSubmitting, setStatus } = formikHelpers;
    setSubmitting(true);

    if (!elements) {
      setSubmitting(false);
      return setStatus({ serverErrors: ['An error occurred, let us know!'] });
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setSubmitting(false);
      return setStatus({ serverErrors: ['An error occurred, let us know!'] });
    }

    // POST the token ID to your backend.
    async function stripeTokenHandler(token: Stripe.Token | undefined) {
      if (!token) return;
      // TODO: hook up the correct payment endpoint
      const [response, error] = await post('/charge', { token: token.id });
      if (error)
        setStatus({ serverErrors: ['An error occurred, let us know!'] });
      return response;
    }

    const result = await stripe?.createToken(card);
    if (result?.error) {
      setSubmitting(false);
      setStatus({ serverErrors: [result.error.message] });
    } else {
      setStatus({ serverErrors: [] });
      const response = await stripeTokenHandler(result?.token);
      if (!response)
        setStatus({ serverErrors: ['An error occurred, let us know!'] });
      onSubmit(values, formikHelpers);
    }
  };

  return (
    <FormWrapper
      {...formikConfig}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      className={className}
    >
      {(props) => <>{children(props)}</>}
    </FormWrapper>
  );
};

// Setup Stripe.js and the Elements provider
const stripePromise = Stripe.loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
export const StripeFormWrapper: FunctionComponent<
  FormikConfig<any> & {
    className?: string;
    validationSchema: any;
    children: (formikProps: FormikProps<any>) => ReactElement;
  }
> = (props) => (
  <Elements stripe={stripePromise}>
    <StripeFormWrapperContent {...props} />
  </Elements>
);
