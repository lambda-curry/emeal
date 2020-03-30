import React, { FunctionComponent } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { useLocation, Switch } from 'react-router-dom';

export const FadeRouteSwitchAnimation: FunctionComponent = ({ children }) => {
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
          <Switch location={location}>{children}</Switch>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};
