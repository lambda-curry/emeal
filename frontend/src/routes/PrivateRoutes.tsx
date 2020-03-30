import React from 'react';
import { DashboardPage } from '../pages/DashboardPage';
import { PrivateRoute } from './PrivateRoute';
import { FadeRouteSwitchAnimation } from '../animations/FadeRouteSwitchAnimation';

export const PrivateRoutes = () => (
  <FadeRouteSwitchAnimation>
    <PrivateRoute exact path='/' component={DashboardPage} />
  </FadeRouteSwitchAnimation>
);
