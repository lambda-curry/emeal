import React, { FunctionComponent } from 'react';
import classnames from 'classnames';
import { useLocation, Link } from 'react-router-dom';

export const HeaderMenuItem: FunctionComponent<{
  className?: string;
  to: string;
}> = props => {
  const location = useLocation();
  const active = location.pathname === props.to ? 'active' : '';
  const { children, className, ...rest } = props;
  return (
    <Link className={classnames(className, active)} {...rest}>
      {children}
    </Link>
  );
};
