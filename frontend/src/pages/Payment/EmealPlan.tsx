import React, { FunctionComponent } from 'react';
import { Icon, IconNames } from '../../components/Icon';
import './emeal-plan.scss';

export const EmealPlan: FunctionComponent<{
  icon: IconNames;
  name: string;
  amount: string;
  limits: string[];
  onSelect: (plan: string) => any;
  extras?: { mostPopular: boolean };
}> = ({ icon, name, amount, limits, onSelect, extras }) => {
  return (
    <div className='emeal-plan'>
      {extras?.mostPopular ? (
        <div className='emeal-plan-most-popular'>Most Popular</div>
      ) : null}
      <div className='emeal-plan-section pricing'>
        <Icon className='emeal-plan-icon' name={icon} />
        <h2 className='emeal-plan-name'>{name}</h2>
        <div className='emeal-plan-amount'>{amount}</div>
        <div className='emeal-plan-period'>Per month</div>
        <hr />
      </div>
      <div className='emeal-plan-section details'>
        {limits.map((limit, i) => (
          <div key={i} className='emeal-plan-limit'>
            {limit}
          </div>
        ))}
        <button
          className='emeal-plan-select button-primary-light'
          onClick={() => onSelect(name)}
        >
          Select Plan
        </button>
      </div>
    </div>
  );
};
