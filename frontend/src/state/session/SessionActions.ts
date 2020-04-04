import {
  UserResponse,
  SessionResponse,
  CouponResponse,
} from '../../../../shared';
import { SessionState, SessionDispatch } from './SessionProvider';

export type SessionActionsCreator = (
  state: SessionState,
  dispatch: SessionDispatch
) => SessionActionsType;

export type SessionActionsType = {
  [x: string]: (payload: any) => void;
};

export const SessionActions: SessionActionsCreator = (
  state: SessionState,
  dispatch: SessionDispatch
) => ({
  saveSession: (payload: SessionResponse) => {
    dispatch({ name: 'set-session', payload });
  },

  saveUser: (payload: UserResponse) => {
    dispatch({ name: 'set-user', payload });
  },

  saveCoupon: (payload: CouponResponse) => {
    dispatch({ name: 'set-coupon', payload });
  },

  destroySession: () => {
    dispatch({ name: 'destroy-session' });
  },
});
