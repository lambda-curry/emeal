import React from 'react';
import { ForgotPasswordForm } from '../components/forms/ForgotPasswordForm';
import { Link } from 'react-router-dom';

export const ForgotPasswordPage = () => (
  <main className='page forgot-password'>
    <div className='page-container'>
      <h2>Reset Password</h2>
      <ForgotPasswordForm />
      <p>
        Don't have an account? <Link to='/signup'>Create one now.</Link>
      </p>
    </div>
  </main>
);
