import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';
import { LogoType } from '../brand/LogoType';

export const Header = () => {
  return (
    <div className='header'>
      <div className='header-row'>
        <LogoType />
        <div className='header-spacer'></div>
        <div className='header-menu'>
          <Link to='/dashboard'>Dashboard</Link>
          <Link to='/dashboard'>Design</Link>
          <Link to='/dashboard'>Embed</Link>
        </div>
        <div className='header-spacer'></div>
        <Link to='/profile'>Profile</Link>
      </div>
    </div>
  );
};
