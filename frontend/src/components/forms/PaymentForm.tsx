import React from 'react';
import { FormikProps } from 'formik';
import * as Yup from 'yup';
import { StripeFormWrapper } from './StripeFormWrapper';
import { ServerErrors } from './ServerErrors';
import { useHistory } from 'react-router-dom';
import { CardFieldWrapper } from './CardFieldWrapper';

interface PaymentFormValues {
  card: boolean;
}
const PaymentSchema = Yup.object().shape({
  card: Yup.bool().oneOf([true], 'Please double check your card information.'),
});

export const PaymentForm = () => {
  const history = useHistory();

  const pay = () => history.push('/');

  return (
    <StripeFormWrapper
      className='payment-form'
      initialValues={{ card: false }}
      validationSchema={PaymentSchema}
      onSubmit={pay}
    >
      {(formikProps: FormikProps<PaymentFormValues>) => (
        <>
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
