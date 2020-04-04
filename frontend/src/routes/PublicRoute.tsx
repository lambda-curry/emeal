import React from 'react';
import { Route, RouteProps, useHistory } from 'react-router-dom';
import { useSession } from '../state/session/SessionProvider';
import { isAuthenticated } from '../state/session/SessionSelectors';

export const PublicRoute = (props: RouteProps) => {
  const { state } = useSession();
  const history = useHistory();

  if (isAuthenticated(state)) {
    history.push('/');
    return null;
  }

  return <Route {...props} />;
};
