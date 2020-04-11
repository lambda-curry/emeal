import React from 'react';
import './header.scss';
import { LogoType } from '../brand/LogoType';
import { ProfileBug } from './ProfileBug';
import { useSession } from '../../state/session/SessionProvider';
import {
  selectCurrentProject,
  selectedCouponExists,
} from '../../state/session/SessionSelectors';
import { Navbar } from '../Navbar/Navbar';
import { NavbarItem } from '../Navbar/NavbarItem';
import { useLocation } from 'react-router-dom';

export const Header = () => {
  const { state } = useSession();
  const currentProjectId = selectCurrentProject(state)?.id;
  const hasCoupon = selectedCouponExists(state);
  const location = useLocation();

  return (
    <div className='header'>
      <LogoType />

      <Navbar>
        <NavbarItem
          text='Dashboard'
          icon='pie_chart'
          disabled={!currentProjectId}
          to={`/project/${currentProjectId}`}
        />
        <NavbarItem
          text='Design'
          icon='paintbrush'
          disabled={!currentProjectId}
          to={`/project/${currentProjectId}/design`}
        />

        <NavbarItem
          text='Embed'
          icon='embed'
          disabled={!hasCoupon}
          to={`/project/${currentProjectId}/embed`}
        />
      </Navbar>

      <NavbarItem
        className='header-profile'
        active={location.pathname.includes('profile')}
        to='/profile'
      >
        <ProfileBug />
      </NavbarItem>
    </div>
  );
};
