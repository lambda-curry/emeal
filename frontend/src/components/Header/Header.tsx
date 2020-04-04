import React from 'react';
import './header.scss';
import { LogoType } from '../brand/LogoType';
import { ProfileBug } from './ProfileBug';
import { HeaderMenuItem } from './HeaderMenuItem';
import { useSession } from '../../state/session/SessionProvider';
import {
  selectedProject,
  selectedCoupon,
} from '../../state/session/SessionSelectors';

export const Header = () => {
  const { state } = useSession();
  const selectedProjectId = selectedProject(state)?.id;
  const hasCoupon = !!selectedCoupon(state)?.id;

  return (
    <div className='header'>
      <LogoType />
      <div className='header-row'>
        <div className='header-menu'>
          <HeaderMenuItem
            disabled={!selectedProjectId}
            className='header-menu-item'
            to={`/project/${selectedProjectId}`}
          >
            Dashboard
          </HeaderMenuItem>
          <HeaderMenuItem
            disabled={!selectedProjectId}
            className='header-menu-item'
            to={`/project/${selectedProjectId}/design`}
          >
            Design
          </HeaderMenuItem>
          <HeaderMenuItem
            disabled={!hasCoupon}
            className='header-menu-item'
            to={`/project/${selectedProjectId}/embed`}
          >
            Embed
          </HeaderMenuItem>
        </div>
      </div>
      <HeaderMenuItem className='header-menu-profile' to='/profile'>
        <ProfileBug />
      </HeaderMenuItem>
    </div>
  );
};
