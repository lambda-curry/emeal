import React from 'react';
import { PrivateRoute } from './PrivateRoute';
import { FadeRouteSwitchAnimation } from '../animations/FadeRouteSwitchAnimation';
import { routes } from './routes';

export const PrivateRoutes = () => (
  <FadeRouteSwitchAnimation>
    {routes.private.map(route => (
      <PrivateRoute key={route.path} {...route} />
    ))}
  </FadeRouteSwitchAnimation>
);
