import React, { useState } from 'react';
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
import { ImageLoader } from '../Image/ImageLoader';
import { Icon } from '../Icon';
import classNames from 'classnames';

declare global {
  interface Window {
    emealModalSettings: {
      isPreview?: boolean;
      title: string;
      description: string;
      image: string;
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
  const { actions } = useSession();
  const { state } = useSession();
  const currentProject = selectCurrentProject(state);
  const currentCoupon = currentProject?.coupon;
  const [imgLoaded, setImgLoaded] = useState(false);

  const saveProject = async (
    values: DesignFormValues,
    { setSubmitting, setStatus, resetForm }: FormikHelpers<DesignFormValues>
  ) => {
    const { title, info, files } = values;
    setStatus({ state: 'saving' });

    if (files?.length) {
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
      actions.saveProject(projectResponse);
      setStatus({ state: 'success' });
      resetForm({ values });
    }
  };

  const preview = async (formikProps: FormikProps<DesignFormValues>) => {
    const { title, info, files, image } = formikProps.values;

    const previewImage = image
      ? image
      : files[0]
      ? URL.createObjectURL(files[0])
      : '';

    window.emealModalSettings = {
      isPreview:
        window.location.host === 'local.emeal.me:3000' ||
        window.location.host === 'app.emeal.me'
          ? true
          : false,
      title,
      description: info,
      image: previewImage,
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

        const previewImage = values.image
          ? values.image
          : values.files[0]
          ? URL.createObjectURL(values.files[0])
          : null;

        return (
          <>
            {previewImage ? (
              <div
                className={classNames(
                  'design-preview',
                  imgLoaded ? 'loaded' : ''
                )}
              >
                <ImageLoader
                  src={previewImage}
                  onLoad={() => setImgLoaded(true)}
                  alt='coupon graphic'
                />

                <button
                  className='button-icon'
                  type='button'
                  onClick={() => {
                    setFieldValue('files', [], false);
                    setFieldValue('image', null, false);
                  }}
                  aria-label='replace coupon graphic'
                >
                  <Icon name='trash' />
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
            <FieldWrapper
              {...formikProps}
              label=''
              type='title'
              name='title'
              inputProps={{ maxLength: 60 }}
            />
            <label htmlFor='info'>Info</label>
            <FieldWrapper
              {...formikProps}
              label=''
              type='info'
              name='info'
              as='textarea'
              inputProps={{ maxLength: 180, rows: 4 }}
            />
            <ServerErrors status={status} />
            <div className='form-actions'>
              <button
                className='button-primary-light'
                type='button'
                disabled={!values.title}
                onClick={() => preview(formikProps)}
              >
                <Icon name='play' />
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
