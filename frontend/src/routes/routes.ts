import { DashboardPage } from '../pages/Dashboard/DashboardPage';
import { PublicLayout } from '../layout/PublicLayout';
import { PrivateLayout } from '../layout/PrivateLayout';
import { LoginPage } from '../pages/LoginPage';
import { SignupPage } from '../pages/SignupPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { ProfilePage } from '../pages/ProfilePage';
import { DesignPage } from '../pages/DesignPage';
import { ComponentType } from 'react';
import { EmbedPage } from '../pages/EmbedPage';
import { PaymentPage } from '../pages/PaymentPage';
import { PrivateLayoutSimple } from '../layout/PrivateLayoutSimple';

interface RouteConfig {
  path?: string;
  component: ComponentType;
  exact?: boolean;
  layout?: ComponentType;
}

interface EmealRoutes {
  public: RouteConfig[];
  private: RouteConfig[];
}

export const emealLayouts = {
  public: PublicLayout,
  private: PrivateLayout,
};

export const routes: EmealRoutes = {
  public: [
    {
      path: '/login',
      component: LoginPage,
      exact: true,
    },
    {
      path: '/signup',
      component: SignupPage,
      exact: true,
    },
    {
      path: '/reset-password',
      component: ForgotPasswordPage,
      exact: true,
    },
  ],
  private: [
    {
      path: '/payment',
      component: PaymentPage,
      exact: true,
      layout: PrivateLayoutSimple,
    },
    {
      path: '/project/:projectId',
      component: DashboardPage,
      exact: true,
    },
    {
      path: '/profile',
      component: ProfilePage,
      exact: true,
    },
    {
      path: '/project/:projectId/design',
      component: DesignPage,
      exact: true,
    },
    {
      path: '/project/:projectId/embed',
      component: EmbedPage,
      exact: true,
    },
    {
      // No Match
      component: DashboardPage,
    },
  ],
};
