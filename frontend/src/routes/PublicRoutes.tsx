import React from 'react';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { PublicRoute } from './PublicRoute';
import { FadeRouteSwitchAnimation } from '../animations/FadeRouteSwitchAnimation';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';

export const PublicRoutes = () => {
  return (
    <FadeRouteSwitchAnimation>
      <PublicRoute exact path='/login' component={LoginPage} />
      <PublicRoute exact path='/signup' component={SignupPage} />
      <PublicRoute
        exact
        path='/reset-password'
        component={ForgotPasswordPage}
      />
    </FadeRouteSwitchAnimation>
  );
};
