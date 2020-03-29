import React from 'react';
import { Formik, Form, FormikProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { FieldWrapper } from '../FieldWrapper';
import { Link } from 'react-router-dom';
import { handlePromise } from '../../../utils/helpers';
import { post } from '../../../utils/api';
import { useAuth } from '../../../state/AuthProvider';

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  projectName: string;
  website: string;
}

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Please enter your name.'),
  email: Yup.string()
    .email('Please enter a valid email address.')
    .required('Please enter your email address.'),
  password: Yup.string()
    .min(7, 'Please enter a longer password.')
    .required('Please enter a password.'),
  restaurant_name: Yup.string().required(
    'Please enter the name of your restaurant.'
  ),
  restaurant_website: Yup.string()
    .url('Please enter a valid website url.')
    .required(`Please enter your restaurant's website url.`)
});

export const SignupForm = () => {
  const { actions: authAuctions } = useAuth();

  const signup = async (
    values: SignupFormValues,
    { setSubmitting, setTouched, setStatus }: FormikHelpers<SignupFormValues>
  ) => {
    const [response, error] = await handlePromise(post('signup', values));
    setSubmitting(false);

    if (error) {
      setTouched({});
      return setStatus({ serverErrors: error.errors });
    }

    if (response) authAuctions.authenticate();
  };

  return (
    <div className='login-form'>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          projectName: '',
          website: ''
        }}
        validationSchema={SignupSchema}
        onSubmit={signup}
      >
        {(formikProps: FormikProps<SignupFormValues>) => (
          <Form>
            <FieldWrapper {...formikProps} type='name' name='name' />
            <FieldWrapper {...formikProps} type='email' name='email' />
            <FieldWrapper {...formikProps} type='password' name='password' />
            <FieldWrapper
              {...formikProps}
              type='text'
              name='projectName'
              label='Restaurant Name'
            />
            <FieldWrapper
              {...formikProps}
              type='text'
              name='website'
              label='Restaurant Website'
            />
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
