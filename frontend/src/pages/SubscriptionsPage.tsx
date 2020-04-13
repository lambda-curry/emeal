import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { post } from '../utils/api';
import { UserResponse } from '../../../shared';
import { useSession } from '../state/session/SessionProvider';

export const SubscriptionsPage = () => {
  const history = useHistory();
  const { actions } = useSession();
  const [state, setState] = useState<'' | 'canceling'>('');

  const cancelSubscription = async () => {
    setState('canceling');
    const [response, error] = await post<UserResponse, {}>(
      'payment/subscription/cancel',
      {}
    );

    if (error)
      throw new Error(`Guess you can't cancel, our server won't let you.`);
    setState('');
    actions.saveUser(response);
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

          <button
            style={{ marginTop: '32px' }}
            onClick={cancelSubscription}
            disabled={state === 'canceling'}
          >
            {state === 'canceling' ? 'Canceling...' : 'Cancel subscription'}
          </button>
        </div>
      </div>
    </main>
  );
};
