import React from 'react';
import { FormikHelpers, FormikProps, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FieldWrapper } from './FieldWrapper';
import { ServerErrors } from './ServerErrors';
import { FormWrapper } from './FormWrapper';
import { FileUpload } from '../FileUpload';

interface DesignFormValues {
  file: File[];
  title: string;
  info: string;
}

const DesignSchema = Yup.object().shape({
  file: Yup.array().required('Please select a file.'),
  title: Yup.string().required('Please enter the deal title.'),
  info: Yup.string().required('Please enter details for the deal.')
});

export const DesignForm = () => {
  // const { actions: sessionActions } = useSession();

  const saveDesign = async (
    values: DesignFormValues,
    { setSubmitting, setStatus }: FormikHelpers<DesignFormValues>
  ) => {
    // const [response, error] = await post('login', values);
    setSubmitting(false);
    // if (error) return setStatus({ serverErrors: error.errors });
    // if (response) sessionActions.saveUser(response.user);
  };

  const preview = (formikProps: FormikProps<DesignFormValues>) => {
    console.log(formikProps.values);
  };

  return (
    <FormWrapper
      className='design-form'
      initialValues={{ file: [], title: '', info: '' }}
      validationSchema={DesignSchema}
      onSubmit={saveDesign}
    >
      {(formikProps: FormikProps<DesignFormValues>) => (
        <>
          <div className='design-file'>
            <label htmlFor='dropzone'>Image</label>
            <FileUpload
              fileLimit={1}
              handleDrop={files =>
                formikProps.setFieldValue('file', files, true)
              }
            />
            <ErrorMessage
              className='form-input-error'
              name='file'
              component='div'
            />
          </div>
          <label htmlFor='title'>Title</label>
          <FieldWrapper {...formikProps} label='' type='title' name='title' />
          <label htmlFor='info'>Info</label>
          <FieldWrapper
            {...formikProps}
            label=''
            type='info'
            name='info'
            as='textarea'
          />
          <ServerErrors status={formikProps.status} />
          <div className='form-actions'>
            <button
              className='button-primary-outline'
              type='button'
              disabled={
                formikProps.isSubmitting ||
                !formikProps.dirty ||
                !formikProps.isValid
              }
              onClick={() => preview(formikProps)}
            >
              Preview
            </button>
            <button
              type='submit'
              disabled={
                formikProps.isSubmitting ||
                !formikProps.dirty ||
                !formikProps.isValid
              }
            >
              Save
            </button>
          </div>
        </>
      )}
    </FormWrapper>
  );
};
