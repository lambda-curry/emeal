import React, { ReactElement } from 'react';
import { Field, ErrorMessage, FormikProps } from 'formik';
import { titleCase } from '../../utils/helpers';
import { Icon, IconNames } from '../Icon';
import classNames from 'classnames';

export const FieldWrapper = (
  props: {
    type?: string;
    name: string;
    label?: string;
    icon?: IconNames;
    as?: string;
    children?: ReactElement[];
    inputProps?:
      | Partial<HTMLInputElement>
      | Partial<HTMLTextAreaElement>
      | Partial<HTMLSelectElement>;
  } & FormikProps<any>
) => {
  const { as, icon, name, type, children, inputProps, status } = props;
  const label = props.label ?? titleCase(props.name);
  const hasSuffix = as === 'select';
  return (
    <div
      className={classNames(
        'form-field',
        icon ? 'hasIcon' : '',
        hasSuffix ? 'hasSuffix' : ''
      )}
    >
      {icon && <Icon name={icon} />}
      {hasSuffix && <Icon className='suffix' name='angle_down_regular' />}
      <Field
        {...inputProps}
        as={as}
        name={name}
        type={type}
        placeholder={label}
        children={children}
        onChange={(value: any) => {
          props.setStatus({ ...status, serverErrors: [] });
          props.handleChange(value);
        }}
      />
      <ErrorMessage className='form-input-error' name={name} component='div' />
    </div>
  );
};
