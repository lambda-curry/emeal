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
import { PlanNames, SessionResponse } from '../../../../shared';
import { useSession } from '../../state/session/SessionProvider';

interface PaymentFormValues {
  plan: PlanNames;
  card: boolean;
}
const PaymentSchema = Yup.object().shape({
  card: Yup.bool().oneOf([true], 'Please double check your card information.'),
});

export const PaymentForm = () => {
  const history = useHistory();
  const location = useLocation<{ plan: string }>();
  const { actions } = useSession();

  const initialSelectedPlan = location.state?.plan || 'basic';

  const pay = async (
    {
      values: { plan },
      token: { id: tokenId },
    }: { values: PaymentFormValues; token: Stripe.Token },
    formikHelpers: FormikHelpers<PaymentFormValues>
  ) => {
    const [response, error] = await post<SessionResponse, {}>('payment', {
      plan,
      tokenId,
    });

    return console.log({ plan, tokenId });

    if (error) throw new Error('your payment broke our system');
    actions.saveSession(response);
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
            inputProps={{ value: initialSelectedPlan }}
          >
            <option value='basic' label='Basic - $14 a month' />
            <option value='pro' label='Pro - $29 a month' />
            <option value='restaurateur' label='Restaurateur - $49 a month' />
          </FieldWrapper>
          <CardFieldWrapper {...formikProps} name='card' />
          <ServerErrors status={formikProps.status} />
          <div className='form-actions-right'>
            <button type='submit' disabled={formikProps.isSubmitting}>
              Save Payment Method
            </button>
          </div>
        </>
      )}
    </StripeFormWrapper>
  );
};
