import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PrivateLayout } from '../layout/PrivateLayout';
import { PublicLayout } from '../layout/PublicLayout';

export const RouteLayouts = () => (
  <Switch>
    <Route exact path='/' component={PrivateLayout} />
    <Route exact path='/login' component={PublicLayout} />
    <Route exact path='/signup' component={PublicLayout} />
    <Route exact path='/reset-password' component={PublicLayout} />
    <Route exact path='/profile' component={PrivateLayout} />
    <Route exact path='/design' component={PrivateLayout} />
  </Switch>
);
