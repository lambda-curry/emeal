import React from 'react';
import { Formik, Form, FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';

import { Link } from 'react-router-dom';
import { post } from '../../../utils/api';
import { handlePromise } from '../../../utils/helpers';
import { FieldWrapper } from '../FieldWrapper';
import { useAuth } from '../../../state/AuthProvider';

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
  const { actions: authAuctions } = useAuth();

  const login = async (
    values: LoginFormValues,
    { setSubmitting, setStatus, setTouched }: FormikHelpers<LoginFormValues>
  ) => {
    const [response, error] = await handlePromise(post('login', values));
    setSubmitting(false);

    if (error) {
      setTouched({});
      return setStatus({ serverErrors: error.errors });
    }

    if (response) authAuctions.authenticate();
  };

  return (
    <div className='form login-form'>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={login}
      >
        {(formikProps: FormikProps<LoginFormValues>) => (
          <Form>
            <FieldWrapper {...formikProps} type='email' name='email' />
            <FieldWrapper {...formikProps} type='password' name='password' />
            {formikProps.status &&
              formikProps.status.serverErrors &&
              formikProps.status.serverErrors.map((error: string) => (
                <div key={error} className='form-error'>
                  {error}
                </div>
              ))}
            <button
              className='login-form-submit'
              type='submit'
              disabled={formikProps.isSubmitting}
            >
              Log In
            </button>
            <div className='form-content'>
              Don't have an account? <Link to='/signup'>Create one now.</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
