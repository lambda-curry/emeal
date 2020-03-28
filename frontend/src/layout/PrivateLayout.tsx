import React from 'react';
import { PrivateRoutes } from '../routes/PrivateRoutes';

export const PrivateLayout = () => (
  <div className='private-layout'>
    Private
    <hr />
    <PrivateRoutes />
  </div>
);
