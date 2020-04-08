import React from 'react';
import { FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';

import { post } from '../../utils/api';
import { FieldWrapper } from './FieldWrapper';
import { useSession } from '../../state/session/SessionProvider';
import { ServerErrors } from './ServerErrors';
import { FormWrapper } from './FormWrapper';
import { SessionResponse } from '../../../../shared';

interface LoginFormValues {
  email: string;
  password: string;
}

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address.')
    .required('Please enter your email address.'),
  password: Yup.string()
    .min(7, 'Please enter a longer password')
    .required('Please enter your password.'),
});

export const LoginForm = () => {
  const { actions } = useSession();

  const login = async (
    values: LoginFormValues,
    { setSubmitting, setStatus }: FormikHelpers<LoginFormValues>
  ) => {
    const [response, error] = await post<SessionResponse, LoginFormValues>(
      'login',
      values
    );
    setSubmitting(false);
    if (error) return setStatus({ serverErrors: error.errors });
    if (response) actions.saveSession(response);
  };

  return (
    <FormWrapper
      className='login-form'
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={login}
    >
      {(formikProps: FormikProps<LoginFormValues>) => (
        <>
          <FieldWrapper
            {...formikProps}
            icon='email'
            type='email'
            name='email'
          />
          <FieldWrapper
            {...formikProps}
            icon='lock'
            type='password'
            name='password'
          />
          <ServerErrors status={formikProps.status} />
          <div className='form-actions-right'>
            <button type='submit' disabled={formikProps.isSubmitting}>
              Log In
            </button>
          </div>
        </>
      )}
    </FormWrapper>
  );
};
