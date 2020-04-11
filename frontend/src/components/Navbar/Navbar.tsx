import React from 'react';
import './navbar.scss';

export const Navbar: React.FunctionComponent = ({ children }) => (
  <nav className='navbar'>
    <div className='navbar-items'>{children}</div>
  </nav>
);
