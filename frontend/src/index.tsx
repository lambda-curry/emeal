import React, { FunctionComponent, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { RouteLayouts } from './routes/RouteLayouts';
import { AllProviders } from './state/AllProviders';
import { useSession } from './state/SessionProvider';
import { useAsyncEffect } from './utils/helpers';
import { get } from './utils/api';

const OnLoad: FunctionComponent = ({ children }) => {
  const { actions: sessionActions } = useSession();
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const [response, error] = await get('user');
    if (!error) sessionActions.saveUser(response.user);
    setLoading(false);
  };

  useAsyncEffect(fetchUser, undefined, []);
  if (loading) return null;
  return <>{children}</>;
};

ReactDOM.render(
  <AllProviders>
    <OnLoad>
      <Router>
        <RouteLayouts />
      </Router>
    </OnLoad>
  </AllProviders>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
