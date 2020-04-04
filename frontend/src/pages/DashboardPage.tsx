import React, { useEffect } from 'react';
import './dashboard-page.scss';
import { useLocation, useHistory } from 'react-router-dom';
import { useSession } from '../state/session/SessionProvider';
import { selectCurrentProject } from '../state/session/SessionSelectors';

export const DashboardPage = () => {
  const location = useLocation();
  const { state } = useSession();
  const history = useHistory();

  useEffect(() => {
    history.push(`/project/${selectCurrentProject(state).id}`);
  }, [history, state, location.pathname]);

  if (location.pathname === '/') return null;

  return (
    <div className='page dashboard'>
      <h2>Dashboard Page</h2>
    </div>
  );
};
