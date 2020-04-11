import { SessionState } from './SessionProvider';

export const isAuthenticated = (state: SessionState) => !!state.user.name;

export const selectCurrentProject = (state: SessionState) =>
  state.projects[state.currentProjectIndex];

export const selectCurrentCoupon = (state: SessionState) =>
  state.projects[state.currentProjectIndex]?.coupon;

export const selectedCouponExists = (state: SessionState) => {
  const coupon = state.projects[state.currentProjectIndex]?.coupon;
  return coupon && coupon.title && coupon.description && coupon.image;
};

export const isPaying = (state: SessionState) =>
  state.user.stripe?.subscription?.id;

export const isCanceled = (state: SessionState) =>
  state.user.stripe?.subscription?.cancelAtPeriodEnd !== 'false';
