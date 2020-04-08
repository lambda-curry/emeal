import React from 'react';
import { Icon, IconNames } from '../../components/Icon';

export const DashboardItem = ({
  label,
  icon,
  children,
}: {
  label: string;
  icon: IconNames;
  children?: React.ReactChild;
}) => (
  <div className='dashboard-item'>
    <Icon name={icon} />
    <div>
      <div className='dashboard-label'>{label}</div>
      <div className='dashboard-number'>{children}</div>
    </div>
  </div>
);
