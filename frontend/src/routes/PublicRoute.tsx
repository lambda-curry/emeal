import React, { ElementType } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSession } from '../state/SessionProvider';

export const PublicRoute = ({
  component: RouteComponent,
  ...props
}: {
  component: ElementType;
  [x: string]: any;
}) => {
  const {
    selectors: { isAuthenticated }
  } = useSession();

  if (isAuthenticated) return <Redirect to='/' />;
  return (
    <Route
      render={routeProps => <RouteComponent {...routeProps} {...props} />}
    />
  );
};
