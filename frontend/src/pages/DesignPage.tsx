import React from 'react';
import './design-page.scss';
import { DesignForm } from '../components/forms/DesignForm';

export const DesignPage = () => (
  <div className='page design'>
    <div className='page-container'>
      <h2>Coupon</h2>
      <DesignForm />
    </div>
  </div>
);
