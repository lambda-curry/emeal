import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { useLocation, Link } from 'react-router-dom';

export const HeaderMenuItem: FunctionComponent<{
  disabled?: boolean;
  className?: string;
  to: string;
}> = (props) => {
  const location = useLocation();
  const { children, className, ...rest } = props;
  return (
    <Link
      className={classNames(
        className,
        location.pathname === props.to ? 'active' : '',
        props.disabled ? 'disabled' : ''
      )}
      {...rest}
    >
      {children}
    </Link>
  );
};
