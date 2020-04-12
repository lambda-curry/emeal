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

    const result = await stripe?.createToken(card);
    if (result?.error) {
      setSubmitting(false);
      return setStatus({ serverErrors: [result.error.message] });
    }

    if (!result?.token)
      return setStatus({ serverErrors: ['An error occurred, let us know!'] });

    setStatus({ serverErrors: [] });
    onSubmit({ values, token: result.token }, formikHelpers);
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
const stripePromise = Stripe.loadStripe(process.env.REACT_APP_STRIPE_KEY || '');
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
