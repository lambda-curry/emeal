import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { useLocation, Link } from 'react-router-dom';
import { IconNames, Icon } from '../Icon';

export const HeaderMenuItem: FunctionComponent<{
  icon?: IconNames;
  text?: string;
  disabled?: boolean;
  className?: string;
  to: string;
}> = (props) => {
  const location = useLocation();
  const { icon, text, children, className, ...rest } = props;
  return (
    <Link
      className={classNames(
        className,
        location.pathname === props.to ? 'active' : '',
        props.disabled ? 'disabled' : ''
      )}
      {...rest}
    >
      {icon && <Icon name={icon} />}
      {text && <span className='header-menu-item-text'>{text}</span>}
      {children}
    </Link>
  );
};
