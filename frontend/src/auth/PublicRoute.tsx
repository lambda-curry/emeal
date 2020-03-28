import React, { ElementType } from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
  component: RouteComponent,
  ...props
}: {
  component: ElementType;
  [x: string]: any;
}) =>
  false ? (
    <Redirect to='/' />
  ) : (
    <Route
      render={routeProps => <RouteComponent {...routeProps} {...props} />}
    />
  );
