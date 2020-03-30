import React from 'react';
import { PrivateRoutes } from '../routes/PrivateRoutes';
import { Header } from '../components/Header/Header';

export const PrivateLayout = () => (
  <div className='private-layout'>
    <Header />
    <PrivateRoutes />
  </div>
);
