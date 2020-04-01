import React from 'react';
import { DashboardPage } from '../pages/DashboardPage';
import { PrivateRoute } from './PrivateRoute';
import { FadeRouteSwitchAnimation } from '../animations/FadeRouteSwitchAnimation';
import { ProfilePage } from '../pages/ProfilePage';
import { DesignPage } from '../pages/DesignPage';

export const PrivateRoutes = () => (
  <FadeRouteSwitchAnimation>
    <PrivateRoute exact path='/' component={DashboardPage} />
    <PrivateRoute exact path='/profile' component={ProfilePage} />
    <PrivateRoute exact path='/design' component={DesignPage} />
  </FadeRouteSwitchAnimation>
);
