import React, { useEffect } from 'react';
import { Route, RouteProps, useHistory } from 'react-router-dom';
import { useSession } from '../state/session/SessionProvider';
import { isAuthenticated } from '../state/session/SessionSelectors';

export const PublicRoute = (props: RouteProps) => {
  const { state } = useSession();
  const history = useHistory();

  useEffect(() => {
    if (isAuthenticated(state)) history.push('/');
    return () => {};
  });

  return <Route {...props} />;
};
