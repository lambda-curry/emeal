import React from 'react';
import { FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';

import { post } from '../../utils/api';
import { FieldWrapper } from './FieldWrapper';
import { useSession } from '../../state/SessionProvider';
import { ServerErrors } from './ServerErrors';
import { FormWrapper } from './FormWrapper';

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
    .required('Please enter your password.')
});

export const LoginForm = () => {
  const { actions: sessionActions } = useSession();

  const login = async (
    values: LoginFormValues,
    { setSubmitting, setStatus }: FormikHelpers<LoginFormValues>
  ) => {
    const [response, error] = await post('login', values);
    setSubmitting(false);
    if (error) return setStatus({ serverErrors: error.errors });
    if (response) sessionActions.saveUser(response.user);
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
          <FieldWrapper {...formikProps} type='email' name='email' />
          <FieldWrapper {...formikProps} type='password' name='password' />
          <ServerErrors status={formikProps.status} />
          <button
            className='login-form-submit'
            type='submit'
            disabled={formikProps.isSubmitting}
          >
            Log In
          </button>
        </>
      )}
    </FormWrapper>
  );
};
