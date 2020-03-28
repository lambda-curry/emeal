import React from 'react';
import { Switch } from 'react-router-dom';
import { DashboardPage } from '../pages/DashboardPage';
import { PrivateRoute } from '../auth/PrivateRoute';

export const PrivateRoutes = () => (
  <Switch>
    <PrivateRoute exact path='/' component={DashboardPage} />
  </Switch>
);
