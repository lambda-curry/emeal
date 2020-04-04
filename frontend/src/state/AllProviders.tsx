import React, { FunctionComponent } from 'react';
import { SessionProvider } from './session/SessionProvider';

export const AllProviders: FunctionComponent = ({ children }) => (
  <SessionProvider>{children}</SessionProvider>
);
