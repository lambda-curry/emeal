import React from 'react';
import { PublicRoutes } from '../routes/PublicRoutes';
import { LogoType } from '../components/brand/LogoType';

export const PublicLayout = () => (
  <div className='public-layout'>
    <LogoType />
    <PublicRoutes />
  </div>
);
