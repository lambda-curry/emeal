import React from 'react';
import { FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';

import { post } from '../../utils/api';
import { FieldWrapper } from './FieldWrapper';
import { ServerErrors } from './ServerErrors';
import { FormWrapper } from './FormWrapper';
import { ForgotPasswordResponse } from '../../../../shared';

interface ForgotPasswordValues {
  email: string;
}

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address.')
    .required('Please enter your email address.'),
});

export const ForgotPasswordForm = () => {
  const resetPassword = async (
    values: ForgotPasswordValues,
    { setSubmitting, setStatus }: FormikHelpers<ForgotPasswordValues>
  ) => {
    const [response, error] = await post<
      ForgotPasswordResponse,
      ForgotPasswordValues
    >('forgotPassword', values);
    setSubmitting(false);
    if (error) return setStatus({ serverErrors: error.errors });

    // TODO: what should happen? Probably show something that says check your email
    if (response) return;
  };

  return (
    <FormWrapper
      className='forgot-password-form'
      initialValues={{ email: '' }}
      validationSchema={ForgotPasswordSchema}
      onSubmit={resetPassword}
    >
      {(formikProps: FormikProps<ForgotPasswordValues>) => (
        <>
          <FieldWrapper
            {...formikProps}
            icon='email'
            type='email'
            name='email'
          />
          <ServerErrors status={formikProps.status} />
          <div className='form-actions-center'>
            <button type='submit' disabled={formikProps.isSubmitting}>
              Reset Password
            </button>
          </div>
        </>
      )}
    </FormWrapper>
  );
};
