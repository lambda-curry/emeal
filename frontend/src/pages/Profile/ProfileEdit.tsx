import React, { FunctionComponent } from 'react';
import { ProfileForm } from '../../components/forms/ProfileForm';
import { Link } from 'react-router-dom';

export const ProfileEdit: FunctionComponent = () => {
  return (
    <div className='profile-edit'>
      <ProfileForm />
      <p>
        If you would like to cancel your plan, please{' '}
        <Link to='/subscriptions'>click here</Link>.
      </p>
    </div>
  );
};
