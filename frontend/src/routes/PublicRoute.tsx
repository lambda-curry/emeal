import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSession } from '../state/session/SessionProvider';
import { isAuthenticated } from '../state/session/SessionSelectors';

export const PublicRoute = (props: RouteProps) => {
  const { state } = useSession();
  if (isAuthenticated(state)) return <Redirect to='/' />;
  return <Route {...props} />;
};
