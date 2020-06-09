import React from 'react';
import { FormikHelpers, FormikProps } from 'formik';
import * as Yup from 'yup';

import { post } from '../../utils/api';
import { FieldWrapper } from './FieldWrapper';
import { ServerErrors } from './ServerErrors';
import { FormWrapper } from './FormWrapper';
import { useSession } from '../../state/session/SessionProvider';
import { SessionResponse } from '../../../../shared';
import { useParams, useHistory } from 'react-router-dom';

interface ChangePasswordValues {
  password: string;
  verifyPassword: string;
}

const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(7, 'Please enter a longer password.')
    .required('Please enter a password.'),
  verifyPassword: Yup.string()
    .oneOf(
      [Yup.ref('password')],
      'Please make sure your passwords are the same.'
    )
    .required('Please verify your password.'),
});

export const ChangePasswordForm = () => {
  const { actions } = useSession();
  const { token } = useParams();
  const history = useHistory();

  if (!token) {
    history.replace('/');
    return null;
  }

  const resetPassword = async (
    { password }: ChangePasswordValues,
    { setSubmitting, setStatus }: FormikHelpers<ChangePasswordValues>
  ) => {
    const [response, error] = await post<
      SessionResponse,
      { token: string; password: string }
    >('resetPassword', { password, token });
    setSubmitting(false);
    if (error) return setStatus({ serverErrors: error.errors });
    if (response) actions.saveSession(response);
  };

  return (
    <FormWrapper
      className='forgot-password-form'
      initialValues={{ password: '', verifyPassword: '' }}
      validationSchema={ChangePasswordSchema}
      onSubmit={resetPassword}
    >
      {(formikProps: FormikProps<ChangePasswordValues>) => (
        <>
          <FieldWrapper
            {...formikProps}
            icon='lock'
            type='password'
            name='password'
          />
          <FieldWrapper
            {...formikProps}
            icon='lock'
            type='password'
            label='Verify Password'
            name='verifyPassword'
          />
          <ServerErrors status={formikProps.status} />
          <div className='form-actions-center'>
            <button type='submit' disabled={formikProps.isSubmitting}>
              {formikProps.isSubmitting ? 'Saving...' : 'Save Password'}
            </button>
          </div>
        </>
      )}
    </FormWrapper>
  );
};
