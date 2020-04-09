import React from 'react';
import './payment-page.scss';
import { PaymentForm } from '../../components/forms/PaymentForm';
import { ReactComponent as Graphic } from '../../graphics/Payment_Computer.svg';

export const PaymentPage = () => {
  return (
    <div className='page payment'>
      <div className='page-container'>
        <div className='page-item'>
          <Graphic className='payment-graphic' />
          <div className='payment-container'>
            <h2 className='payment-title'>ADD PAYMENT METHOD</h2>
            <p className='payment-content'>
              You won't be charged until your free trial ends.
            </p>
            <PaymentForm />
          </div>
        </div>
      </div>
    </div>
  );
};
