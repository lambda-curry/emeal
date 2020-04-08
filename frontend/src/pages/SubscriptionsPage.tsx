import React from 'react';

export const SubscriptionsPage = () => {
  const cancelSubscription = async () => {
    // TODO: Hook up cancel subscription
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
