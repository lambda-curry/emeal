import React, { ElementType } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../state/AuthProvider';

export const PrivateRoute = ({
  component: RouteComponent,
  ...props
}: {
  component: ElementType;
  [x: string]: any;
}) => {
  const { state: authState } = useAuth();
  const authenticated = authState.isAuthenticated;

  console.log('>>>', authenticated);
  if (!authenticated) return <Redirect to='/login' />;

  return (
    <Route
      render={routeProps => <RouteComponent {...routeProps} {...props} />}
    />
  );
};
