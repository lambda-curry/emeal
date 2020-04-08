import React from 'react';
import { SignupForm } from '../components/forms/SignupForm';
import { Link } from 'react-router-dom';

export const SignupPage = () => (
  <main className='page signup'>
    <div className='page-container'>
      <div className='page-item'>
        <h2>Sign Up</h2>
        <SignupForm />
      </div>
      <p>
        Already have an account? <Link to='/login'>Log in now.</Link>
      </p>
    </div>
  </main>
);
