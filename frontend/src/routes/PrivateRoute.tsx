import React, { useEffect } from 'react';
import { Route, RouteProps, useHistory, useLocation } from 'react-router-dom';
import { useSession } from '../state/session/SessionProvider';
import { isAuthenticated } from '../state/session/SessionSelectors';

export const PrivateRoute = (props: RouteProps) => {
  const { state } = useSession();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated(state)) {
      history.push(`/login`);
      return () => {};
    }

    // Todo: hook up whether or not a user is paying
    // if (location.pathname !== '/payment' && !isPaying(state)) {
    //   history.push('/payment');
    //   return () => {};
    // }
  }, [state, location.pathname, history]);

  return <Route {...props} />;
};
