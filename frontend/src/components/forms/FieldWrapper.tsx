import React from 'react';
import { Field, ErrorMessage, FormikProps } from 'formik';
import { titleCase } from '../../utils/helpers';
import { Icon, IconNames } from '../Icon';
import classNames from 'classnames';

export const FieldWrapper = (
  props: {
    type: string;
    name: string;
    label?: string;
    icon?: IconNames;
    as?: string;
    inputProps?: Partial<HTMLInputElement> | Partial<HTMLTextAreaElement>;
  } & FormikProps<any>
) => {
  const { as, icon, name, type, inputProps, status } = props;
  const label = props.label ?? titleCase(props.name);
  return (
    <div className={classNames('form-field', icon ? 'hasIcon' : '')}>
      {/* <label htmlFor={name}>{label}</label> */}
      {icon && <Icon name={icon} />}
      <Field
        {...inputProps}
        as={as}
        name={name}
        type={type}
        placeholder={label}
        onChange={(value: any) => {
          props.setStatus({ ...status, serverErrors: [] });
          props.handleChange(value);
        }}
      />
      <ErrorMessage className='form-input-error' name={name} component='div' />
    </div>
  );
};
