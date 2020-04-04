import { SessionState } from './SessionProvider';

export const isAuthenticated = (state: SessionState) => !!state.user.name;

export const selectedProject = (state: SessionState) =>
  state.projects[state.selectedProjectIndex];

export const selectedCoupon = (state: SessionState) =>
  state.projects[state.selectedProjectIndex].coupon;
