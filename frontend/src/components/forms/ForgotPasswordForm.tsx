import React from 'react';
import { FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';

import { post } from '../../utils/api';
import { handlePromise } from '../../utils/helpers';
import { FieldWrapper } from './FieldWrapper';
import { ServerErrors } from './ServerErrors';
import { FormWrapper } from './FormWrapper';

interface ForgotPasswordValues {
  email: string;
}

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address.')
    .required('Please enter your email address.')
});

export const ForgotPasswordForm = () => {
  const resetPassword = async (
    values: ForgotPasswordValues,
    { setSubmitting, setStatus }: FormikHelpers<ForgotPasswordValues>
  ) => {
    const [response, error] = await handlePromise(
      post('forgotPassword', values)
    );
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
          <FieldWrapper {...formikProps} type='email' name='email' />
          <ServerErrors status={formikProps.status} />
          <button
            className='login-form-submit'
            type='submit'
            disabled={formikProps.isSubmitting}
          >
            Reset Password
          </button>
        </>
      )}
    </FormWrapper>
  );
};
