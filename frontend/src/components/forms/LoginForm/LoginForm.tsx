import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormField } from '../FormFIeld';
import { Link } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email address.')
    .required('Please enter your email address.'),
  password: Yup.string()
    .min(7, 'Please enter a longer password')
    .required('Please enter your password.')
});

export const LoginForm = () => {
  return (
    <div className='login-form'>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <FormField type='email' name='email' />
            <FormField type='password' name='password' />
            <button
              className='login-form-submit'
              type='submit'
              disabled={isSubmitting}
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
