import React from 'react';
import { PrivateRoutes } from '../routes/PrivateRoutes';
import { LogoType } from '../components/brand/LogoType';

export const PrivateLayoutSimple = () => (
  <div className='private-layout-simple'>
    <LogoType />
    <PrivateRoutes />
  </div>
);
