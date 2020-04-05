import React from 'react';
import { ProfileForm } from '../components/forms/ProfileForm';
import './profile-page.scss';

export const ProfilePage = () => (
  <main className='page profile'>
    <div className='page-container'>
      <div className='page-item'>
        <h2>Account settings</h2>
        <ProfileForm />
      </div>
    </div>
  </main>
);
