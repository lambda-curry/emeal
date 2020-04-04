import React from 'react';
import './dashboard-page.scss';
import { useParams, Redirect, useLocation } from 'react-router-dom';
import { useSession } from '../state/session/SessionProvider';
import { selectDefaultProject } from '../state/session/SessionSelectors';

export const DashboardPage = () => {
  const location = useLocation();
  const { projectId } = useParams();
  const { state } = useSession();

  if (location.pathname === '/') {
    if (projectId) return <Redirect to={`/project/${projectId}`} />;
    else return <Redirect to={`/project/${selectDefaultProject(state)}`} />;
  }

  return (
    <div className='page dashboard'>
      <h2>Dashboard Page</h2>
    </div>
  );
};
