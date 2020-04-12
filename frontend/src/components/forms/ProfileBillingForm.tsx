import React, { useState } from 'react';
import { FormikProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import * as Stripe from '@stripe/stripe-js';
import { StripeFormWrapper } from './StripeFormWrapper';
import { ServerErrors } from './ServerErrors';
import { useHistory } from 'react-router-dom';
import { CardFieldWrapper } from './CardFieldWrapper';
import { patch } from '../../utils/api';
import { UserResponse } from '../../../../shared';

interface BillingFormValues {
  card: boolean;
}
const PaymentSchema = Yup.object().shape({
  card: Yup.bool().oneOf([true], 'Please double check your card information.'),
});

export const ProfileBillingForm = () => {
  const history = useHistory();

  const updatePaymentMethod = async (
    {
      token: { id: tokenId },
    }: { values: BillingFormValues; token: Stripe.Token },
    formikHelpers: FormikHelpers<BillingFormValues>
  ) => {
    const [, error] = await patch<UserResponse, { tokenId: string }>(
      'payment',
      {
        tokenId,
      }
    );

    if (error) throw new Error('your payment broke our system');
    history.push('/profile');
  };

  return (
    <StripeFormWrapper
      className='profile-billing-form'
      initialValues={{ card: false }}
      validationSchema={PaymentSchema}
      onSubmit={updatePaymentMethod}
    >
      {(formikProps: FormikProps<BillingFormValues>) => (
        <>
          <label htmlFor='card'>Update payment method</label>
          <CardFieldWrapper {...formikProps} name='card' />
          <ServerErrors status={formikProps.status} />
          <div className='form-actions-right'>
            <button type='submit' disabled={formikProps.isSubmitting}>
              {formikProps.isSubmitting ? 'Saving...' : 'Save Payment Method'}
            </button>
          </div>
        </>
      )}
    </StripeFormWrapper>
  );
};
