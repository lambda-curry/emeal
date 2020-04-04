import React from 'react';
import './header.scss';
import { LogoType } from '../brand/LogoType';
import { ProfileBug } from './ProfileBug';
import { HeaderMenuItem } from './HeaderMenuItem';
import { useSession } from '../../state/session/SessionProvider';
import { selectedProject } from '../../state/session/SessionSelectors';

export const Header = () => {
  const { state } = useSession();
  return (
    <div className='header'>
      <LogoType />
      <div className='header-row'>
        <div className='header-menu'>
          <HeaderMenuItem
            className='header-menu-item'
            to={`/project/${selectedProject(state)}`}
          >
            Dashboard
          </HeaderMenuItem>
          <HeaderMenuItem
            className='header-menu-item'
            to={`/project/${selectedProject(state)}/design`}
          >
            Design
          </HeaderMenuItem>
          <HeaderMenuItem
            className='header-menu-item'
            to={`/project/${selectedProject(state)}/embed`}
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
