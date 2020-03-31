import React, { FunctionComponent } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useLocation, Switch } from 'react-router-dom';

export const FadeRouteSwitchAnimation: FunctionComponent = ({ children }) => {
  const location = useLocation();
  return (
    <TransitionGroup className='route-wrapper'>
      <CSSTransition
        key={location.pathname}
        timeout={300}
        classNames='fade'
        unmountOnExit={true}
      >
        <Switch location={location}>{children}</Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};
