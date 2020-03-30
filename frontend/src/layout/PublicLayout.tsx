import React from 'react';
import { PublicRoutes } from '../routes/PublicRoutes';
import { LogoType } from '../components/brand/LogoType';
import { Link } from 'react-router-dom';

export const PublicLayout = () => (
  <div className='public-layout'>
    <Link className='public-layout-logo' to='/login'>
      <LogoType />
    </Link>
    <PublicRoutes />
  </div>
);
