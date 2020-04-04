import React from 'react';
import { Route, Redirect, RouteProps, useHistory } from 'react-router-dom';
import { useSession } from '../state/session/SessionProvider';
import { isAuthenticated } from '../state/session/SessionSelectors';

export const PrivateRoute = (props: RouteProps) => {
  const { state } = useSession();
  const history = useHistory();

  if (!isAuthenticated(state)) {
    history.push(`/login`);
    return null;
  }

  return <Route {...props} />;
};
