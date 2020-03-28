import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';

export const PublicRoutes = () => (
  <Switch>
    <Route exact path='/login' component={LoginPage} />
  </Switch>
);
