import React from 'react';
import { FormikProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { FieldWrapper } from './FieldWrapper';
import { patch } from '../../utils/api';
import { useSession } from '../../state/SessionProvider';
import { ServerErrors } from './ServerErrors';
import { FormWrapper } from './FormWrapper';

interface ProfileFormValues {
  name: string;
  email: string;
}

const SignupSchema = Yup.object().shape({
  name: Yup.string().required('Please enter your name.'),
  email: Yup.string()
    .email('Please enter a valid email address.')
    .required('Please enter your email address.')
});

export const ProfileForm = () => {
  const {
    state: { user },
    actions: sessionActions
  } = useSession();

  const update = async (
    values: ProfileFormValues,
    { setSubmitting, setStatus }: FormikHelpers<ProfileFormValues>
  ) => {
    const [response, error] = await patch('user', values);
    setSubmitting(false);
    if (error) return setStatus({ serverErrors: error.errors });
    if (response) sessionActions.saveUser(response.user);
  };

  return (
    <FormWrapper
      className='signup-form'
      initialValues={{
        name: user?.name,
        email: user?.email
      }}
      validationSchema={SignupSchema}
      onSubmit={update}
    >
      {(formikProps: FormikProps<ProfileFormValues>) => (
        <>
          <FieldWrapper {...formikProps} type='name' name='name' />
          <FieldWrapper {...formikProps} type='email' name='email' />
          <ServerErrors status={formikProps.status} />
          <div className='form-actions'>
            <button type='submit' disabled={formikProps.isSubmitting}>
              Save
            </button>
          </div>
        </>
      )}
    </FormWrapper>
  );
};
