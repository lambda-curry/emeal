import React from 'react';
import { FormikProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { FieldWrapper } from './FieldWrapper';
import { post } from '../../utils/api';
import { useSession } from '../../state/SessionProvider';
import { ServerErrors } from './ServerErrors';
import { FormWrapper } from './FormWrapper';

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
  projectName: Yup.string().required(
    'Please enter the name of your restaurant.'
  ),
  website: Yup.string()
    .url('Please enter a valid website url.')
    .required(`Please enter your restaurant's website url.`)
});

export const SignupForm = () => {
  const { actions: sessionActions } = useSession();

  const signup = async (
    values: SignupFormValues,
    { setSubmitting, setStatus }: FormikHelpers<SignupFormValues>
  ) => {
    const [response, error] = await post('signup', values);
    setSubmitting(false);
    if (error) return setStatus({ serverErrors: error.errors });
    if (response) sessionActions.saveUser(response.user);
  };

  console.log(signup);

  return (
    <FormWrapper
      className='signup-form'
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
        <>
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
          <ServerErrors status={formikProps.status} />
          <div className='form-actions'>
            <button type='submit' disabled={formikProps.isSubmitting}>
              Sign Up
            </button>
          </div>
        </>
      )}
    </FormWrapper>
  );
};
