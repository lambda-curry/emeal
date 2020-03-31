import React from 'react';
import { LoginForm } from '../components/forms/LoginForm';
import { Link } from 'react-router-dom';

export const LoginPage = () => (
  <main className='page login'>
    <div className='page-container'>
      <h2>Log In</h2>
      <LoginForm />
      <p>
        Don't have an account? <Link to='/signup'>Create one now.</Link>
      </p>
      <p>
        Forgot your password? <Link to='/reset-password'>Reset it here.</Link>
      </p>
    </div>
  </main>
);
