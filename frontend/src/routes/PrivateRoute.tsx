import React, { useEffect } from 'react';
import { Route, RouteProps, useHistory, useLocation } from 'react-router-dom';
import { useSession } from '../state/session/SessionProvider';
import { isAuthenticated, isPaying } from '../state/session/SessionSelectors';

export const PrivateRoute = (props: RouteProps) => {
  const { state } = useSession();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated(state)) {
      history.push(`/login`);
      return;
    }

    // if (
    //   !['/payment', '/select-plan'].includes(location.pathname) &&
    //   !isPaying(state)
    // ) {
    //   history.push('/select-plan');
    //   return;
    // } else if (
    //   ['/payment', '/select-plan'].includes(location.pathname) &&
    //   isPaying(state)
    // ) {
    //   history.push('/');
    //   return;
    // }
  }, [state, location.pathname, history]);

  return <Route {...props} />;
};
