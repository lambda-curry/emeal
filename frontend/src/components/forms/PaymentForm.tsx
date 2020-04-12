import React, { useState } from 'react';
import { FormikProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import * as Stripe from '@stripe/stripe-js';
import { StripeFormWrapper } from './StripeFormWrapper';
import { ServerErrors } from './ServerErrors';
import { useHistory, useLocation } from 'react-router-dom';
import { CardFieldWrapper } from './CardFieldWrapper';
import { FieldWrapper } from './FieldWrapper';
import { post } from '../../utils/api';
import {
  SessionResponse,
  EmealStripePlanId,
  UserResponse,
} from '../../../../shared';
import { useSession } from '../../state/session/SessionProvider';

interface PaymentFormValues {
  plan: { value: EmealStripePlanId; label: string };
  card: boolean;
}
const PaymentSchema = Yup.object().shape({
  card: Yup.bool().oneOf([true], 'Please double check your card information.'),
});

export const PaymentForm = () => {
  const history = useHistory();
  const location = useLocation<{ planId: EmealStripePlanId }>();
  const { actions } = useSession();

  const planOptions = [
    { value: 'emeal_basic', label: 'Basic - $14 a month' },
    { value: 'emeal_pro', label: 'Pro - $29 a month' },
    {
      value: 'emeal_restaurateur',
      label: 'Restaurateur - $49 a month',
    },
  ];

  const initialSelectedPlan =
    planOptions.find((plan) => plan.value === location.state?.planId) ||
    planOptions[0];

  const pay = async (
    {
      values: { plan },
      token: { id: tokenId },
    }: { values: PaymentFormValues; token: Stripe.Token },
    formikHelpers: FormikHelpers<PaymentFormValues>
  ) => {
    const [response, error] = await post<
      UserResponse,
      {
        planId: EmealStripePlanId;
        tokenId: string;
      }
    >('payment/subscription', {
      planId: plan.value,
      tokenId,
    });

    if (error) throw new Error('your payment broke our system');
    actions.saveUser(response);
    history.push('/');
  };

  return (
    <StripeFormWrapper
      className='payment-form'
      initialValues={{ card: false, plan: initialSelectedPlan }}
      validationSchema={PaymentSchema}
      onSubmit={pay}
    >
      {(formikProps: FormikProps<PaymentFormValues>) => (
        <>
          <FieldWrapper
            {...formikProps}
            as='select'
            name='plan'
            selectProps={{
              defaultValue: initialSelectedPlan,
              options: planOptions,
            }}
          />

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
