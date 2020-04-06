import {
  UserResponse,
  SessionResponse,
  ProjectResponse,
  AnaltyicsResponse,
} from '../../../../shared';
import { SessionState, emptySessionState } from './SessionProvider';

export type SessionReducerNames =
  | 'set-session'
  | 'set-analytics'
  | 'set-user'
  | 'set-project'
  | 'destroy-session';

type SessionReducers = {
  [key in SessionReducerNames]: (
    state: SessionState,
    payload?: any
  ) => SessionState;
};

export const sessionReducers: SessionReducers = {
  'set-session': (state: SessionState, { session }: SessionResponse) => ({
    ...state,
    ...session,
  }),
  'set-analytics': (state: SessionState, { analytics }: AnaltyicsResponse) => ({
    ...state,
    analytics,
  }),
  'set-user': (state, { user }: UserResponse) => ({
    ...state,
    user,
  }),
  'set-project': (state, { project }: ProjectResponse) => {
    state.projects[state.currentProjectIndex] = project;
    return state;
  },
  'destroy-session': () => emptySessionState,
};
