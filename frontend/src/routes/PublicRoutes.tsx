import React from 'react';
import { PublicRoute } from './PublicRoute';
import { FadeRouteSwitchAnimation } from '../animations/FadeRouteSwitchAnimation';
import { routes } from './routes';
import { LoginPage } from '../pages/LoginPage';

export const PublicRoutes = () => {
  return (
    <FadeRouteSwitchAnimation>
      {routes.public.map((route) => (
        <PublicRoute key={route.path} {...route} />
      ))}
      {/* Note: Adding this prevents the private nomatch route from getting activated */}
      <PublicRoute component={LoginPage} />>
    </FadeRouteSwitchAnimation>
  );
};
