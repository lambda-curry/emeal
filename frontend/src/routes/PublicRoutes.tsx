import React from 'react';
import { Switch, useLocation } from 'react-router-dom';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { PublicRoute } from './PublicRoute';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

export const PublicRoutes = () => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        timeout={300}
        classNames='fade'
        mountOnEnter={true}
        unmountOnExit={true}
      >
        <div className='route-wrapper'>
          <Switch location={location}>
            <PublicRoute exact path='/login' component={LoginPage} />
            <PublicRoute exact path='/signup' component={SignupPage} />
          </Switch>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};
