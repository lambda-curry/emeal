import React from 'react';
import { ProfileForm } from '../components/forms/ProfileForm';
import './profile-page.scss';
import { post } from '../utils/api';
import { useHistory, Link } from 'react-router-dom';
import { useSession } from '../state/session/SessionProvider';

export const ProfilePage = () => {
  const history = useHistory();
  const { actions } = useSession();

  const signOut = async () => {
    const [, error] = await post<any, {}>('logout', {});
    if (error) throw new Error(`Yo.... couldn't log out`);
    actions.destroySession();
    history.push('/login');
  };

  return (
    <main className='page profile'>
      <div className='page-container'>
        <div className='page-item'>
          <button className='profile-sign-out' onClick={signOut}>
            Sign Out
          </button>
          <ProfileForm />

          <p>
            If you would like to cancel your plan, please{' '}
            <Link to='/subscriptions'>click here</Link>.
          </p>
        </div>
      </div>
    </main>
  );
};
