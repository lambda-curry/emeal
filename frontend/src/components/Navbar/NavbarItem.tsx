import React, { FunctionComponent } from 'react';
import classNames from 'classnames';
import { useLocation, Link } from 'react-router-dom';
import { IconNames, Icon } from '../Icon';

export const NavbarItem: FunctionComponent<{
  icon?: IconNames;
  text?: string;
  disabled?: boolean;
  className?: string;
  active?: boolean;
  to: string;
}> = (props) => {
  const location = useLocation();
  const { icon, text, children, className, active, ...rest } = props;
  return (
    <Link
      className={classNames(
        className,
        'navbar-item',
        icon ? 'hasIcon' : '',
        active || location.pathname === props.to ? 'active' : '',
        props.disabled ? 'disabled' : ''
      )}
      {...rest}
    >
      {icon && <Icon name={icon} />}
      {text && <span className='navbar-item-text'>{text}</span>}
      {children}
    </Link>
  );
};
