import React, { FunctionComponent } from 'react';
import classnames from 'classnames';

import { ReactComponent as logo } from '../icons/emeal-logo.svg';

export const icons: {
  [x: string]: FunctionComponent<React.SVGProps<SVGSVGElement>>;
} = {
  logo
};

export const Icon = ({
  name,
  className,
  ...props
}: {
  name: string;
  className?: string;
}) => {
  if (!name || !icons[name]) return null;

  const Icon = icons[name];

  return (
    <span {...props} className={classnames(`icon icon-${name}`, className)}>
      <Icon role='presentation' />
    </span>
  );
};
