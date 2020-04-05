import React from 'react';
import { FormikHelpers, FormikProps, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FieldWrapper } from './FieldWrapper';
import { ServerErrors } from './ServerErrors';
import { FormWrapper } from './FormWrapper';
import { FileUpload } from '../FileUpload';
import { patch, upload } from '../../utils/api';
import { ProjectResponse, CouponDto } from '../../../../shared';
import { useSession } from '../../state/session/SessionProvider';
import { selectCurrentProject } from '../../state/session/SessionSelectors';

declare global {
  interface Window {
    emealModalSettings: {
      isLocal: boolean;
      title: string;
      info: string;
      imgSrc: string;
    };
  }
}

interface DesignFormValues {
  image: null | string;
  files: File[];
  title: string;
  info: string;
}

const DesignSchema = Yup.object().shape({
  image: Yup.string().url().nullable(),
  files: Yup.array().when(
    'image',
    (image: string, schema: Yup.ArraySchema<any>) => {
      return !!image ? schema : schema.required('Please select an image.');
    }
  ),
  title: Yup.string().required('Please enter the coupon title.'),
  info: Yup.string().required('Please enter details for the coupon.'),
});

export const DesignForm = () => {
  const { actions: sessionActions } = useSession();
  const { state } = useSession();
  const currentProject = selectCurrentProject(state);
  const currentCoupon = currentProject.coupon;

  const saveProject = async (
    values: DesignFormValues,
    { setSubmitting, setStatus }: FormikHelpers<DesignFormValues>
  ) => {
    const { title, info, files } = values;
    setStatus({ state: 'saving' });

    const imageUploadFormData = new FormData();
    imageUploadFormData.append('image', files[0]);

    const [, uploadError] = await upload<ProjectResponse>(
      `project/${currentProject.id}/image`,
      imageUploadFormData
    );

    if (uploadError) {
      setSubmitting(false);
      return setStatus({ state: 'error', serverErrors: uploadError.errors });
    }

    const project = {
      ...currentProject,
      coupon: { title, description: info },
    };

    const [projectResponse, projectError] = await patch<
      ProjectResponse,
      { coupon: Partial<CouponDto> }
    >('project', project);
    setSubmitting(false);
    if (projectError)
      return setStatus({ state: 'error', serverErrors: projectError.errors });
    if (projectResponse) {
      sessionActions.saveProject(projectResponse);
      setStatus({ state: 'success' });
    }
  };

  const preview = async (formikProps: FormikProps<DesignFormValues>) => {
    const { title, info, files } = formikProps.values;

    window.emealModalSettings = {
      isLocal: process.env.REACT_APP_ENV === 'local' ? true : false,
      title,
      info,
      imgSrc: files[0] ? URL.createObjectURL(files[0]) : '',
    };
    await loadModalScripts();
  };

  return (
    <FormWrapper
      className='design-form'
      initialValues={{
        image: currentCoupon.image || null,
        files: [],
        title: currentCoupon.title || '',
        info: currentCoupon.description || '',
      }}
      validationSchema={DesignSchema}
      onSubmit={saveProject}
    >
      {(formikProps: FormikProps<DesignFormValues>) => {
        const {
          setFieldValue,
          status,
          isSubmitting,
          dirty,
          values,
        } = formikProps;

        const previewImage =
          values.image || values.files[0]
            ? URL.createObjectURL(values.files[0])
            : null;

        return (
          <>
            {previewImage ? (
              <div className='design-preview'>
                <img src={previewImage} alt='coupon graphic' />
                <button
                  className='button-primary-outline'
                  type='button'
                  onClick={() => {
                    setFieldValue('files', [], false);
                    setFieldValue('image', null, false);
                  }}
                >
                  Select another image
                </button>
              </div>
            ) : null}
            {values.files.length < 1 && !previewImage ? (
              <div className='design-file'>
                <label htmlFor='dropzone'>Image</label>
                <FileUpload
                  fileLimit={1}
                  handleDrop={(files) => setFieldValue('files', files, true)}
                />
                <ErrorMessage
                  className='form-input-error'
                  name='files'
                  component='div'
                />
              </div>
            ) : null}
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
            <ServerErrors status={status} />
            <div className='form-actions'>
              <button
                className='button-primary-outline'
                type='button'
                disabled={!values.title}
                onClick={() => preview(formikProps)}
              >
                Preview
              </button>
              <button
                type='submit'
                disabled={status?.state === 'saving' || isSubmitting || !dirty}
              >
                {status?.state === 'saving' ? 'Saving...' : 'Save'}
              </button>
            </div>
          </>
        );
      }}
    </FormWrapper>
  );
};

function loadModalScripts() {
  const modaljs = window.document.createElement('script');
  modaljs.type = 'text/javascript';
  modaljs.src = `${process.env.PUBLIC_URL}/modal/dist/emeal-embed.min.js`;
  document.body.appendChild(modaljs);
  return new Promise((resolve) => (modaljs.onload = resolve));
}
