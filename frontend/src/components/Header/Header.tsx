import React from 'react';
import './header.scss';
import { LogoType } from '../brand/LogoType';
import { ProfileBug } from './ProfileBug';
import { HeaderMenuItem } from './HeaderMenuItem';

export const Header = () => {
  return (
    <div className='header'>
      <LogoType />
      <div className='header-row'>
        <div className='header-menu'>
          <HeaderMenuItem className='header-menu-item' to='/'>
            Dashboard
          </HeaderMenuItem>
          <HeaderMenuItem className='header-menu-item' to='/design'>
            Design
          </HeaderMenuItem>
          <HeaderMenuItem className='header-menu-item' to='/embed'>
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
