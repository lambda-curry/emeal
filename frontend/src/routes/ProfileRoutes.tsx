import React from 'react';
import { Route } from 'react-router-dom';
import { FadeRouteSwitchAnimation } from '../animations/FadeRouteSwitchAnimation';
import { ProfileEdit } from '../pages/Profile/ProfileEdit';
import { ProfileBilling } from '../pages/Profile/ProfileBilling';

const profileRoutes = [
  {
    path: '/profile',
    component: ProfileEdit,
    exact: true,
  },
  {
    path: '/profile/billing',
    component: ProfileBilling,
    exact: true,
  },
];

export const ProfileRoutes = () => (
  <FadeRouteSwitchAnimation>
    {profileRoutes.map((route) => (
      <Route key={route.path} {...route} />
    ))}
  </FadeRouteSwitchAnimation>
);
