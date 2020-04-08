import React, { useState } from 'react';
import { FormikProps } from 'formik';
import * as Yup from 'yup';
import { StripeFormWrapper } from './StripeFormWrapper';
import { ServerErrors } from './ServerErrors';
import { useHistory, useLocation } from 'react-router-dom';
import { CardFieldWrapper } from './CardFieldWrapper';
import { FieldWrapper } from './FieldWrapper';

interface PaymentFormValues {
  card: boolean;
}
const PaymentSchema = Yup.object().shape({
  card: Yup.bool().oneOf([true], 'Please double check your card information.'),
});

export const PaymentForm = () => {
  const history = useHistory();
  const location = useLocation<{ plan: string }>();
  const [selectedPlan, setSelectedPlan] = useState(
    location.state?.plan || 'basic'
  );

  const pay = () => history.push('/');

  console.log('>>>', selectedPlan);

  return (
    <StripeFormWrapper
      className='payment-form'
      initialValues={{ card: false, plan: selectedPlan }}
      validationSchema={PaymentSchema}
      onSubmit={pay}
    >
      {(formikProps: FormikProps<PaymentFormValues>) => (
        <>
          <FieldWrapper
            {...formikProps}
            handleChange={(e: React.ChangeEvent<any>) => {
              setSelectedPlan(e.target.value);
              formikProps.handleChange(e);
            }}
            as='select'
            name='plan'
            inputProps={{ value: selectedPlan }}
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
