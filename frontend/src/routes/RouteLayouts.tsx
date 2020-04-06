import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { routes, emealLayouts } from './routes';

// Open Question: Adding a unique key here ruins the CSSTransition,
// but adding an empty string key fixes the `Warning: Each child in a list should have a unique "key" prop.`
export const RouteLayouts = () => (
  <Switch>
    {routes.public.map((route) => (
      <Route key='' {...route} component={emealLayouts.public} />
    ))}
    {routes.private.map((route) => (
      <Route
        key=''
        {...route}
        component={route.layout || emealLayouts.private}
      />
    ))}
  </Switch>
);
