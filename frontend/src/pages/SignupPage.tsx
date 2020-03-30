import React from 'react';
import { SignupForm } from '../components/forms/SignupForm';
import { Link } from 'react-router-dom';

export const SignupPage = () => (
  <main className='page signup'>
    <h2>Sign Up</h2>
    <SignupForm />
    <p>
      Already have an account? <Link to='/login'>Log in now.</Link>
    </p>
  </main>
);
