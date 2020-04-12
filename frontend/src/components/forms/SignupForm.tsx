import React from 'react';
import { FormikProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { FieldWrapper } from './FieldWrapper';
import { post } from '../../utils/api';
import { useSession } from '../../state/session/SessionProvider';
import { ServerErrors } from './ServerErrors';
import { FormWrapper } from './FormWrapper';
import { SessionResponse } from '../../../../shared';

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
    .matches(
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm,
      'Please enter a valid website url.'
    )
    .required(`Please enter your restaurant's website url.`),
});

export const SignupForm = () => {
  const { actions } = useSession();

  const signup = async (
    values: SignupFormValues,
    { setSubmitting, setStatus }: FormikHelpers<SignupFormValues>
  ) => {
    const [response, error] = await post<SessionResponse, SignupFormValues>(
      'signup',
      values
    );
    setSubmitting(false);
    if (error) return setStatus({ serverErrors: error.errors });
    if (response) actions.saveSession(response);
  };

  return (
    <FormWrapper
      className='signup-form'
      initialValues={{
        name: '',
        email: '',
        password: '',
        projectName: '',
        website: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={signup}
    >
      {(formikProps: FormikProps<SignupFormValues>) => (
        <>
          <FieldWrapper
            {...formikProps}
            icon='profile'
            type='name'
            name='name'
          />
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
          <FieldWrapper
            {...formikProps}
            icon='restaurant'
            type='text'
            name='projectName'
            label='Restaurant Name'
          />
          <FieldWrapper
            {...formikProps}
            icon='link'
            type='text'
            name='website'
            label='Restaurant Website'
          />
          <ServerErrors status={formikProps.status} />
          <div className='form-actions-center'>
            <button type='submit' disabled={formikProps.isSubmitting}>
              Sign Up
            </button>
          </div>
        </>
      )}
    </FormWrapper>
  );
};
