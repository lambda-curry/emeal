import React from 'react';
import './design-page.scss';
import { DesignForm } from '../components/forms/DesignForm';

export const DesignPage = () => (
  <div className='page design'>
    <div className='page-container'>
      <div className='page-item'>
        <DesignForm />
      </div>
    </div>
  </div>
);
