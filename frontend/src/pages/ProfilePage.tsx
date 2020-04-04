import React from 'react';
import { ProfileForm } from '../components/forms/ProfileForm';
import './profile-page.scss';

export const ProfilePage = () => (
  <main className='page profile'>
    <div className='page-container'>
      <h2>Update Profile</h2>
      <div className='page-item'>
        <ProfileForm />
      </div>
    </div>
  </main>
);
