import { SessionState } from './SessionProvider';

export const isAuthenticated = (state: SessionState) => !!state.user.name;

export const selectCurrentProject = (state: SessionState) =>
  state.projects[state.currentProjectIndex];

export const selectCurrentCoupon = (state: SessionState) =>
  state.projects[state.currentProjectIndex].coupon;

export const selectedCouponExists = (state: SessionState) => {
  const coupon = state.projects[state.currentProjectIndex].coupon;
  // TODO: Add image to this
  return coupon.title && coupon.description;
};
