import React, { FunctionComponent } from 'react';
import { SessionProvider } from './SessionProvider';

export const AllProviders: FunctionComponent = ({ children }) => (
  <SessionProvider>{children}</SessionProvider>
);
