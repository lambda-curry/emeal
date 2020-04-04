import React from 'react';
import { FormikHelpers, FormikProps, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FieldWrapper } from './FieldWrapper';
import { ServerErrors } from './ServerErrors';
import { FormWrapper } from './FormWrapper';
import { FileUpload } from '../FileUpload';
import { patch } from '../../utils/api';
import {
  ProjectResponse,
  CouponResponse,
  ProjectDto,
  CouponDto,
} from '../../../../shared';
import { useSession } from '../../state/session/SessionProvider';

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
  files: File[];
  title: string;
  info: string;
}

const DesignSchema = Yup.object().shape({
  files: Yup.array().required('Please select an image.'),
  title: Yup.string().required('Please enter the coupon title.'),
  info: Yup.string().required('Please enter details for the coupon.'),
});

export const DesignForm = () => {
  const { actions: sessionActions } = useSession();

  const saveProject = async (
    { title, info }: DesignFormValues,
    { setSubmitting, setStatus }: FormikHelpers<DesignFormValues>
  ) => {
    const project = {
      coupon: { title, info },
    };

    const [response, error] = await patch<
      ProjectResponse,
      { coupon: Partial<CouponDto> }
    >('project', project);
    setSubmitting(false);
    if (error) return setStatus({ serverErrors: error.errors });
    if (response) sessionActions.saveProject(response);
  };

  const preview = async (formikProps: FormikProps<DesignFormValues>) => {
    console.log(formikProps.values);
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
      className="design-form"
      initialValues={{
        files: [],
        title: 'Want a free taco?',
        info:
          'Join our taco club and receive a free taco next time you come in!',
      }}
      validationSchema={DesignSchema}
      onSubmit={saveProject}
    >
      {(formikProps: FormikProps<DesignFormValues>) => (
        <>
          <div className="design-file">
            <label htmlFor="dropzone">Image</label>
            <FileUpload
              fileLimit={1}
              handleDrop={(files) =>
                formikProps.setFieldValue('files', files, true)
              }
            />
            <ErrorMessage
              className="form-input-error"
              name="files"
              component="div"
            />
          </div>
          <label htmlFor="title">Title</label>
          <FieldWrapper {...formikProps} label="" type="title" name="title" />
          <label htmlFor="info">Info</label>
          <FieldWrapper
            {...formikProps}
            label=""
            type="info"
            name="info"
            as="textarea"
          />
          <ServerErrors status={formikProps.status} />
          <div className="form-actions">
            <button
              className="button-primary-outline"
              type="button"
              disabled={!formikProps.values.title}
              onClick={() => preview(formikProps)}
            >
              Preview
            </button>
            <button
              type="submit"
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

function loadModalScripts() {
  const modaljs = window.document.createElement('script');
  modaljs.type = 'text/javascript';
  modaljs.src = `${process.env.PUBLIC_URL}/modal/dist/emeal-embed.min.js`;
  document.body.appendChild(modaljs);
  return new Promise((resolve) => (modaljs.onload = resolve));
}
