import { UserResponse, SessionResponse } from '../../../../shared';
import { SessionState, emptySessionState } from './SessionProvider';
import { selectedProject } from './SessionSelectors';

export type SessionReducerNames =
  | 'set-session'
  | 'set-user'
  | 'set-coupon'
  | 'select-default-project'
  | 'destroy-session';

type SessionReducers = {
  [key in SessionReducerNames]: (
    state: SessionState,
    payload: any
  ) => SessionState;
};

export const sessionReducers: SessionReducers = {
  'set-session': (state, { session }: SessionResponse) => ({
    ...state,
    ...session,
  }),
  'set-user': (state, { user }: UserResponse) => ({
    ...state,
    user,
  }),
  'set-coupon': (state, { coupon }) => {
    selectedProject(state).coupon = coupon;
    return state;
  },
  'select-default-project': (state) => ({
    ...state,
    selectedProjectIndex: 0,
  }),
  'destroy-session': () => emptySessionState,
};
