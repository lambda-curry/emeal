import React from 'react';
import './profile-page.scss';
import { post } from '../../utils/api';
import { useHistory } from 'react-router-dom';
import { useSession } from '../../state/session/SessionProvider';
import { Navbar } from '../../components/Navbar/Navbar';
import { NavbarItem } from '../../components/Navbar/NavbarItem';
import { ProfileRoutes } from '../../routes/ProfileRoutes';

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
          <Navbar>
            <NavbarItem
              icon='profile'
              text='Profile'
              className='navbar-item'
              to='/profile'
            />
            <NavbarItem
              icon='computer'
              text='Billing'
              className='navbar-item'
              to='/profile/billing'
            />
            <div style={{ flex: 1 }}></div>
            <button
              className='profile-sign-out'
              type='button'
              onClick={signOut}
            >
              Sign Out
            </button>
          </Navbar>

          <ProfileRoutes />
        </div>
      </div>
    </main>
  );
};
