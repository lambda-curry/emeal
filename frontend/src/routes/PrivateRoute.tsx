import React, { ElementType } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSession } from '../state/SessionProvider';

export const PrivateRoute = ({
  component: RouteComponent,
  ...props
}: {
  component: ElementType;
  [x: string]: any;
}) => {
  const {
    selectors: { isAuthenticated }
  } = useSession();

  if (!isAuthenticated) return <Redirect to='/login' />;

  return (
    <Route
      render={routeProps => <RouteComponent {...routeProps} {...props} />}
    />
  );
};
