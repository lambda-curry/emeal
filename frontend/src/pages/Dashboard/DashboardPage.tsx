import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSession } from '../../state/session/SessionProvider';
import { selectCurrentProject } from '../../state/session/SessionSelectors';
import { get } from '../../utils/api';
import { AnaltyicsResponse } from '../../../../shared';
import './dashboard-page.scss';
import { DashboardItem } from './DashboardItem';
import classNames from 'classnames';
import { Icon } from '../../components/Icon';

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
    if (currentProjectId) {
      const fetchAnalytics = async () => {
        const [response, error] = await get<AnaltyicsResponse>(
          `analytics/${currentProjectId}`
        );
        if (error) throw new Error(`Server down!`);
        actions.saveAnalytics(response);
      };
      fetchAnalytics();
    }
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
        <div className='dashboard-last30'>
          <div className='page-item'>
            <DashboardItem icon='eye' label='Views'>
              {analytics.pageViews30DayCount}
            </DashboardItem>
          </div>
          <div className='page-item'>
            <DashboardItem icon='email' label='Subscribers'>
              {analytics.subscriber30DayCount}
            </DashboardItem>
          </div>
          <div className='page-item'>
            <DashboardItem icon='restaurant' label='Redemptions'>
              {analytics.redeemed30DayCount}
            </DashboardItem>
          </div>
        </div>

        <h3>Total Subscribers</h3>
        <div className='page-item dashboard-subscribers'>
          <div className='dashboard-number-large'>
            {analytics.subscriberCount}
          </div>

          <a
            className={classNames(
              'button button-primary',
              analytics.subscriberCount === 0 ? 'disabled' : ''
            )}
            href={`${process.env.REACT_APP_API}project/${currentProjectId}/emails/csv`}
          >
            Download CSV
          </a>
        </div>
      </div>
    </div>
  );
};
