import React from 'react';
import { PrivateRoutes } from '../routes/PrivateRoutes';
import { LogoType } from '../components/brand/LogoType';
import { useSession } from '../state/session/SessionProvider';

export const PrivateLayoutSimple = () => {
  const { actions } = useSession();

  return (
    <div className='private-layout-simple'>
      <div className='private-layout-simple-header'>
        <a
          className='private-layout-simple-logout'
          href='javascript:void(0);'
          onClick={actions.destroySession}
        >
          Back to Log In
        </a>
        <LogoType />
      </div>
      <PrivateRoutes />
    </div>
  );
};
