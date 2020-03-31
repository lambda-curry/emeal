import React from 'react';
import { DashboardPage } from '../pages/DashboardPage';
import { PrivateRoute } from './PrivateRoute';
import { FadeRouteSwitchAnimation } from '../animations/FadeRouteSwitchAnimation';
import { ProfilePage } from '../pages/ProfilePage';

export const PrivateRoutes = () => (
  <FadeRouteSwitchAnimation>
    <PrivateRoute exact path='/' component={DashboardPage} />
    <PrivateRoute exact path='/profile' component={ProfilePage} />
  </FadeRouteSwitchAnimation>
);
