import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { titleCase } from '../../utils/helpers';
import { Icon } from '../Icon';
import classnames from 'classnames';

export const FormField = ({
  type,
  name,
  icon
}: {
  type: string;
  name: string;
  icon?: string;
}) => {
  const label = titleCase(name.replace('_', ' '));
  return (
    <div className={classnames('form-field', icon ? 'hasIcon' : '')}>
      {/* <label htmlFor={name}>{label}</label> */}
      {icon && <Icon name={icon} />}
      <Field type={type} name={name} placeholder={label} />
      <ErrorMessage className='form-error' name={name} component='div' />
    </div>
  );
};
