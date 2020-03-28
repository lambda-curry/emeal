import React from 'react';
import { Route } from 'react-router-dom';
import { PrivateLayout } from './PrivateLayout';
import { PublicLayout } from './PublicLayout';

export const RouteLayouts = () => (
  <>
    <Route exact path='/' component={PrivateLayout} />
    <Route exact path='/login' component={PublicLayout} />
    <Route exact path='/signup' component={PublicLayout} />
  </>
);
