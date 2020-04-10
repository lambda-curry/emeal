import React, { FunctionComponent } from 'react';
import classNames from 'classnames';

import { ReactComponent as angle_down_regular } from '../icons/angle_down_regular.svg';
import { ReactComponent as computer } from '../icons/computer.svg';
import { ReactComponent as email } from '../icons/email.svg';
import { ReactComponent as emeal_logo } from '../icons/emeal_logo.svg';
import { ReactComponent as eye } from '../icons/eye.svg';
import { ReactComponent as image_upload } from '../icons/image_upload.svg';
import { ReactComponent as link } from '../icons/link.svg';
import { ReactComponent as lock } from '../icons/lock.svg';
import { ReactComponent as paintbrush } from '../icons/paintbrush.svg';
import { ReactComponent as pie_chart } from '../icons/pie_chart.svg';
import { ReactComponent as profile } from '../icons/profile.svg';
import { ReactComponent as restaurant } from '../icons/restaurant.svg';
import { ReactComponent as play } from '../icons/play.svg';
import { ReactComponent as trash } from '../icons/trash.svg';
import { ReactComponent as download } from '../icons/download.svg';
import { ReactComponent as chickenleg } from '../icons/chickenleg.svg';
import { ReactComponent as restaurateur } from '../icons/restaurateur.svg';
import { ReactComponent as embed } from '../icons/embed.svg';

import './icon.scss';

export type IconNames =
  | 'angle_down_regular'
  | 'chickenleg'
  | 'restaurateur'
  | 'embed'
  | 'computer'
  | 'email'
  | 'emeal_logo'
  | 'eye'
  | 'image_upload'
  | 'link'
  | 'lock'
  | 'paintbrush'
  | 'pie_chart'
  | 'profile'
  | 'restaurant'
  | 'play'
  | 'trash'
  | 'download';

export const icons: {
  [key in IconNames]: FunctionComponent<React.SVGProps<SVGSVGElement>>;
} = {
  angle_down_regular,
  computer,
  email,
  emeal_logo,
  eye,
  image_upload,
  link,
  lock,
  paintbrush,
  pie_chart,
  profile,
  restaurant,
  play,
  trash,
  download,
  chickenleg,
  restaurateur,
  embed,
};

export const Icon = ({
  name,
  className,
  ...props
}: {
  name: IconNames;
  className?: string;
}) => {
  if (!name || !icons[name]) return null;

  const Icon = icons[name];

  return (
    <span {...props} className={classNames(`icon icon-${name}`, className)}>
      <Icon role='presentation' />
    </span>
  );
};
