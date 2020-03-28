import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { FormField } from '../FormFIeld';
import { Link } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string()
    .email('Please enter a valid email address')
    .required('Required'),
  password: Yup.string()
    .min(7, 'Please enter a longer password')
    .required('Required'),
  restaurant_name: Yup.string().required('Required'),
  restaurant_website: Yup.string().required('Required')
});

export const SignupForm = () => {
  return (
    <div className='login-form'>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          restaurant_name: '',
          restaurant_website: ''
        }}
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
            <FormField type='name' name='name' />
            <FormField type='email' name='email' />
            <FormField type='password' name='password' />
            <FormField type='text' name='restaurant_name' />
            <FormField type='text' name='restaurant_website' />
            <button
              className='login-form-submit'
              type='submit'
              disabled={isSubmitting}
            >
              Sign Up
            </button>
            <div className='form-content'>
              Already have an account? <Link to='/login'>Log in now.</Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
