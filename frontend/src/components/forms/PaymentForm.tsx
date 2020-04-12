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
import { SessionResponse, EmealStripePlanId } from '../../../../shared';
import { useSession } from '../../state/session/SessionProvider';

interface PaymentFormValues {
  planId: EmealStripePlanId;
  card: boolean;
}
const PaymentSchema = Yup.object().shape({
  card: Yup.bool().oneOf([true], 'Please double check your card information.'),
});

export const PaymentForm = () => {
  const history = useHistory();
  const location = useLocation<{ planId: EmealStripePlanId }>();
  const { actions } = useSession();

  const initialSelectedPlan = location.state?.planId || 'basic';

  const pay = async (
    {
      values: { planId },
      token: { id: tokenId },
    }: { values: PaymentFormValues; token: Stripe.Token },
    formikHelpers: FormikHelpers<PaymentFormValues>
  ) => {
    const [response, error] = await post<
      SessionResponse,
      {
        planId: EmealStripePlanId;
        tokenId: string;
      }
    >('payment/subscription', {
      planId,
      tokenId,
    });

    if (error) throw new Error('your payment broke our system');
    actions.saveSession(response);
    history.push('/');
  };

  return (
    <StripeFormWrapper
      className='payment-form'
      initialValues={{ card: false, planId: initialSelectedPlan }}
      validationSchema={PaymentSchema}
      onSubmit={pay}
    >
      {(formikProps: FormikProps<PaymentFormValues>) => (
        <>
          <FieldWrapper
            {...formikProps}
            as='select'
            name='planId'
            inputProps={{ value: initialSelectedPlan }}
          >
            <option value='emeal_basic' label='Basic - $14 a month' />
            <option value='emeal_pro' label='Pro - $29 a month' />
            <option
              value='emeal_restaurateur'
              label='Restaurateur - $49 a month'
            />
          </FieldWrapper>
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
