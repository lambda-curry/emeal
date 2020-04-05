import React from 'react';
import { Field, ErrorMessage, FormikProps } from 'formik';
import { titleCase } from '../../utils/helpers';
import { Icon } from '../Icon';
import classNames from 'classnames';

export const FieldWrapper = (
  props: {
    type: string;
    name: string;
    label?: string;
    icon?: string;
    as?: string;
  } & FormikProps<any>
) => {
  const { type, name, icon, as } = props;
  const label = props.label ?? titleCase(name);
  return (
    <div className={classNames('form-field', icon ? 'hasIcon' : '')}>
      {/* <label htmlFor={name}>{label}</label> */}
      {icon && <Icon name={icon} />}
      <Field
        type={type}
        name={name}
        placeholder={label}
        as={as}
        onChange={(value: any) => {
          props.setStatus({ ...props.status, serverErrors: [] });
          props.handleChange(value);
        }}
      />
      <ErrorMessage className='form-input-error' name={name} component='div' />
    </div>
  );
};
