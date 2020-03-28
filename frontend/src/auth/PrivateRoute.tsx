import React, { ElementType } from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
  component: RouteComponent,
  ...props
}: {
  component: ElementType;
  [x: string]: any;
}) =>
  false ? (
    <Route
      render={routeProps => <RouteComponent {...routeProps} {...props} />}
    />
  ) : (
    <Redirect to='/login' />
  );
