import React from 'react';
import { useHistory } from 'react-router-dom';
import { post } from '../utils/api';
import { SessionResponse } from '../../../shared';
import { useSession } from '../state/session/SessionProvider';

export const SubscriptionsPage = () => {
  const history = useHistory();
  const { actions } = useSession();

  const cancelSubscription = async () => {
    const [response, error] = await post<SessionResponse, {}>(
      'payment/subscription/cancel',
      {}
    );

    if (error)
      throw new Error(`Guess you can't cancel, our server won't let you.`);

    actions.saveSession(response);
    history.push('/');
  };

  return (
    <main className='page subscriptions'>
      <div className='page-container'>
        <div className='page-item'>
          <h2>Cancel subscription</h2>
          <p>
            You will lose access to all of your data and your embed scripts will
            no longer be active.
          </p>

          <button style={{ marginTop: '32px' }} onClick={cancelSubscription}>
            Cancel subscription
          </button>
        </div>
      </div>
    </main>
  );
};
