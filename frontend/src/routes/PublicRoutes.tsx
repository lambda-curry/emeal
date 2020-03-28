import React from 'react';
import { Switch } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { PublicRoute } from './PublicRoute';

export const PublicRoutes = () => (
  <Switch>
    <PublicRoute exact path='/login' component={LoginPage} />
    <PublicRoute exact path='/signup' component={SignupPage} />
  </Switch>
);
