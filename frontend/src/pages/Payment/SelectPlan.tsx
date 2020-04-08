import React from 'react';
import { EmealPlan } from './EmealPlan';
import './select-plan.scss';
import { useHistory } from 'react-router-dom';

export const SelectPlan = () => {
  const history = useHistory();

  const selectPlan = (plan: string) => history.push('/payment', { plan });

  return (
    <div className='page select-plan'>
      <div className='page-container'>
        <div className='page-item'>
          <div className='emeal-plans'>
            <EmealPlan
              icon='paintbrush'
              name='basic'
              amount='$14'
              limits={['50 Email Captures', '10k Impressions']}
              onSelect={selectPlan}
            />

            <EmealPlan
              icon='restaurant'
              name='pro'
              amount='$29'
              limits={['500 Email Captures', '20k Impressions']}
              onSelect={selectPlan}
            />

            <EmealPlan
              icon='computer'
              name='restaurateur'
              amount='$49'
              limits={['Unlimited Email Captures', '250k Impressions']}
              onSelect={selectPlan}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
