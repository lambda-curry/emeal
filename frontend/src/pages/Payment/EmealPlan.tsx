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
      <div className='emeal-plan-section'>
        <Icon className='emeal-plan-icon' name={icon} />
        <h2 className='emeal-plan-name'>{name}</h2>
        <div className='emeal-plan-amount'>{amount}</div>
        <div className='emeal-plan-period'>Per month</div>
        <hr />
      </div>
      <div className='emeal-plan-section'>
        {limits.map((limit, i) => (
          <div key={i} className='emeal-plan-limit'>
            {limit}
          </div>
        ))}
        <button
          className='emeal-plan-select button-primary-outline'
          onClick={() => onSelect(name)}
        >
          Select Plan
        </button>
      </div>
    </div>
  );
};
