import React from 'react';
import './dashboard-page.scss';
import { Redirect, useLocation } from 'react-router-dom';
import { useSession } from '../state/session/SessionProvider';
import { selectedProject } from '../state/session/SessionSelectors';

export const DashboardPage = () => {
  const location = useLocation();
  const { state } = useSession();

  if (location.pathname === '/')
    return <Redirect to={`/project/${selectedProject(state).id}`} />;

  return (
    <div className='page dashboard'>
      <h2>Dashboard Page</h2>
    </div>
  );
};
