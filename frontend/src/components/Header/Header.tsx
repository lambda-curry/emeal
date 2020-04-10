import React from 'react';
import './header.scss';
import { LogoType } from '../brand/LogoType';
import { ProfileBug } from './ProfileBug';
import { HeaderMenuItem } from './HeaderMenuItem';
import { useSession } from '../../state/session/SessionProvider';
import {
  selectCurrentProject,
  selectedCouponExists,
} from '../../state/session/SessionSelectors';

export const Header = () => {
  const { state } = useSession();
  const currentProjectId = selectCurrentProject(state)?.id;
  const hasCoupon = selectedCouponExists(state);

  return (
    <div className='header'>
      <LogoType />
      <div className='header-row'>
        <div className='header-menu'>
          <HeaderMenuItem
            text='Dashboard'
            icon='pie_chart'
            disabled={!currentProjectId}
            className='header-menu-item'
            to={`/project/${currentProjectId}`}
          />
          <HeaderMenuItem
            text='Design'
            icon='paintbrush'
            disabled={!currentProjectId}
            className='header-menu-item'
            to={`/project/${currentProjectId}/design`}
          />

          <HeaderMenuItem
            text='Embed'
            icon='embed'
            disabled={!hasCoupon}
            className='header-menu-item'
            to={`/project/${currentProjectId}/embed`}
          />
        </div>
      </div>
      <HeaderMenuItem className='header-menu-profile' to='/profile'>
        <ProfileBug />
      </HeaderMenuItem>
    </div>
  );
};
