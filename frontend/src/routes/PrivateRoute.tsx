import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSession } from '../state/SessionProvider';

export const PrivateRoute = (props: RouteProps) => {
  const {
    selectors: { isAuthenticated }
  } = useSession();
  if (!isAuthenticated) return <Redirect to='/login' />;
  return <Route {...props} />;
};
