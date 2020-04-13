import React, { ReactElement } from 'react';
import Select from 'react-select';
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
    suffix?: IconNames;
    as?: string;
    children?: ReactElement[];
    selectProps?: any;
    inputProps?: Partial<HTMLInputElement> | Partial<HTMLTextAreaElement>;
  } & FormikProps<any>
) => {
  const {
    as,
    icon,
    suffix,
    name,
    type,
    children,
    inputProps,
    selectProps,
    status,
  } = props;
  const label = props.label ?? titleCase(props.name);
  return (
    <div
      className={classNames(
        'form-field',
        icon ? 'hasIcon' : '',
        suffix ? 'hasSuffix' : ''
      )}
    >
      {icon && <Icon name={icon} />}
      {suffix && <Icon className='suffix' name='angle_down_regular' />}
      {as === 'select' ? (
        <Select
          {...selectProps}
          className='react-select-wrapper'
          classNamePrefix='react-select'
          isSearchable={false}
          value={props.values[name]}
          onBlur={(e) => props.handleBlur(e)}
          onChange={(value) => {
            if (selectProps.onChange) selectProps.onChange(value);
            props.setFieldValue(name, value);
          }}
        />
      ) : (
        ''
      )}
      {as !== 'select' ? (
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
      ) : (
        ''
      )}
      <ErrorMessage className='form-input-error' name={name} component='div' />
    </div>
  );
};
