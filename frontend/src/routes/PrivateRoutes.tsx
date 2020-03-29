import React from 'react';
import { DashboardPage } from '../pages/DashboardPage';
import { PrivateRoute } from './PrivateRoute';

export const PrivateRoutes = () => (
  <>
    <PrivateRoute exact path='/' component={DashboardPage} />
  </>
);
