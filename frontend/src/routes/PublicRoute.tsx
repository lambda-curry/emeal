import React, { ElementType } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../state/AuthProvider';

export const PublicRoute = ({
  component: RouteComponent,
  ...props
}: {
  component: ElementType;
  [x: string]: any;
}) => {
  const { state: authState } = useAuth();
  if (authState.isAuthenticated) return <Redirect to='/' />;

  return (
    <Route
      render={routeProps => <RouteComponent {...routeProps} {...props} />}
    />
  );
};
