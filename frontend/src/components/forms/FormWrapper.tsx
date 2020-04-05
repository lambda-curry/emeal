import React, { FunctionComponent, ReactElement } from 'react';
import { Formik, Form, FormikHelpers, FormikProps, FormikConfig } from 'formik';
import classNames from 'classnames';

export const FormWrapper: FunctionComponent<
  FormikConfig<any> & {
    className?: string;
    children: (formikProps: FormikProps<any>) => ReactElement;
  }
> = (props) => {
  const { children, className, onSubmit, ...formikConfig } = props;

  const handleSubmit = (values: any, formikHelpers: FormikHelpers<any>) => {
    formikHelpers.setStatus({});
    onSubmit(values, formikHelpers);
  };

  return (
    <div className={classNames(className, 'form')}>
      <Formik {...formikConfig} onSubmit={(a, b) => handleSubmit(a, b)}>
        {(formikProps: FormikProps<any>) => (
          <Form>{children(formikProps)}</Form>
        )}
      </Formik>
    </div>
  );
};
