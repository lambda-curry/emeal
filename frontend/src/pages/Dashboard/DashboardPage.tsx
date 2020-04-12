import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { useSession } from '../../state/session/SessionProvider';
import {
  selectCurrentProject,
  isCanceled,
} from '../../state/session/SessionSelectors';
import { get } from '../../utils/api';
import { AnaltyicsResponse } from '../../../../shared';
import { DashboardItem } from './DashboardItem';
import classNames from 'classnames';
import './dashboard-page.scss';
import { Icon } from '../../components/Icon';

export const DashboardPage = () => {
  const location = useLocation();
  const { state, actions } = useSession();
  const history = useHistory();
  const { analytics } = state;

  const currentProjectId = selectCurrentProject(state)?.id;
  const disableCSVDownload =
    analytics.subscriberCount === 0 || isCanceled(state);

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
        {isCanceled(state) ? (
          <p className='dashboard-canceled'>
            Your plan has been canceled. If you would like to resubscribe or
            change plans, please contact us at{' '}
            <a href='mailto:support@emeal.me'>support@emeal.me</a>
          </p>
        ) : null}
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
              'button button-primary button-prefix',
              disableCSVDownload ? 'disabled' : ''
            )}
            href={`${process.env.REACT_APP_API}project/${currentProjectId}/emails/csv`}
          >
            <Icon name='download' />
            Download CSV
          </a>
        </div>
      </div>
    </div>
  );
};
