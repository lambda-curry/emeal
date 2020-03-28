import React, { FunctionComponent } from 'react';
import { AuthProvider } from './AuthProvider';

export const AllProviders: FunctionComponent = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
);
