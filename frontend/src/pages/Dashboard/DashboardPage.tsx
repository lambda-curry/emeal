import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSession } from '../../state/session/SessionProvider';
import { selectCurrentProject } from '../../state/session/SessionSelectors';
import { get } from '../../utils/api';
import { AnaltyicsResponse } from '../../../../shared';
import './dashboard-page.scss';

// subscriberCount: number;
// redeemed30DayCount: number;
// subscriber30DayCount: number;
// pageViews30DayCount: number;

export const DashboardPage = () => {
  const location = useLocation();
  const { state, actions } = useSession();
  const history = useHistory();
  const { analytics } = state;

  const currentProjectId = selectCurrentProject(state)?.id;

  useEffect(() => {
    const fetchAnalytics = async () => {
      const [response, error] = await get<AnaltyicsResponse>(
        `analytics/${currentProjectId}`
      );
      if (error) throw new Error(`Server down!`);
      actions.saveAnalytics(response);
    };
    fetchAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (location.pathname === '/') history.push(`/project/${currentProjectId}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (
    !currentProjectId ||
    location.pathname === '/' ||
    analytics.subscriberCount === undefined
  )
    return null;

  return (
    <div className='page dashboard'>
      <div className='page-container'>
        <h3>Last 30 Days</h3>
        <div className='page-item'>
          <div className='dashboard-label'>Views</div>
          <div className='dashboard-number'>
            {analytics.pageViews30DayCount}
          </div>
        </div>
        <div className='page-item'>
          <div className='dashboard-label'>New Subscribers</div>
          <div className='dashboard-number'>
            {analytics.subscriber30DayCount}
          </div>
        </div>
        <div className='page-item'>
          <div className='dashboard-label'>Redemptions</div>
          <div className='dashboard-number'>{analytics.redeemed30DayCount}</div>
        </div>

        <h3>Total Subscribers</h3>
        <div className='page-item dashboard-item subscribers'>
          <div className='dashboard-number-large'>
            {analytics.subscriberCount}
          </div>

          <button className='button-primary'>Download CSV</button>
        </div>
      </div>
    </div>
  );
};
