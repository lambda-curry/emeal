import React from 'react';
import { EmealPlan } from './EmealPlan';
import './select-plan.scss';
import { useHistory } from 'react-router-dom';
import { EmealStripePlanId } from '../../../../shared';

export const SelectPlan = () => {
  const history = useHistory();

  const selectPlan = (planId: EmealStripePlanId) =>
    history.push('/payment', { planId });

  return (
    <div className='page select-plan'>
      <div className='page-container'>
        <div className='page-item'>
          <div className='emeal-plans'>
            <EmealPlan
              icon='chickenleg'
              name='basic'
              amount='$14'
              limits={['50 Email Captures', '3k Impressions']}
              onSelect={() => selectPlan('emeal_basic')}
            />

            <EmealPlan
              icon='restaurant'
              name='pro'
              amount='$29'
              limits={['250 Email Captures', '10k Impressions']}
              onSelect={() => selectPlan('emeal_pro')}
              extras={{ mostPopular: true }}
            />

            <EmealPlan
              icon='restaurateur'
              name='restaurateur'
              amount='$49'
              limits={['500 Email Captures', '25k Impressions']}
              onSelect={() => selectPlan('emeal_restaurateur')}
            />
          </div>
          <p className='select-plan-disclaimer'>
            *To help you grow your audience, all plans are free until businesses
            can open back up.
          </p>
        </div>
        <p className='select-plan-enterprise'>
          Need an enterprise plan with support for multiple locations?{' '}
          <a href='mailto:hello@emeal.me'>Get in touch for pricing.</a>
        </p>
      </div>
    </div>
  );
};
