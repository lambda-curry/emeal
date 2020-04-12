import React from 'react';
import { ChangePasswordForm } from '../components/forms/ChangePasswordForm';

export const ChangePasswordPage = () => {
  // TODO: Utlizie GET /api/user/token/:token endpoint to check if token is expired
  return (
    <main className='page forgot-password'>
      <div className='page-container'>
        <div className='page-item'>
          <h2>Update Password</h2>
          <ChangePasswordForm />
        </div>
      </div>
    </main>
  );
};
