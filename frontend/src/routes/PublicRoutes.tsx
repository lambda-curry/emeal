import React from 'react';
import { PublicRoute } from './PublicRoute';
import { FadeRouteSwitchAnimation } from '../animations/FadeRouteSwitchAnimation';
import { routes } from './routes';

export const PublicRoutes = () => {
  return (
    <FadeRouteSwitchAnimation>
      {routes.public.map(route => (
        <PublicRoute key={route.path} {...route} />
      ))}
    </FadeRouteSwitchAnimation>
  );
};
