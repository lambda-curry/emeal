import { UserResponse, SessionResponse } from '../../../../shared';
import { SessionState, emptySessionState } from './SessionProvider';
import { selectDefaultProject } from './SessionSelectors';

interface SessionReducers {
  'set-session': (
    state: SessionState,
    payload: SessionResponse
  ) => SessionState;
  'set-user': (state: SessionState, { user }: UserResponse) => SessionState;
  'select-default-project': (state: SessionState) => SessionState;
  'destroy-session': (state: SessionState) => SessionState;
  [x: string]: (state: any, payload?: any) => SessionState;
}

export const sessionReducers: SessionReducers = {
  'set-session': (state, { session }) => ({
    ...state,
    ...session,
  }),
  'set-user': (state, { user }) => ({
    ...state,
    user,
  }),
  'select-default-project': (state) => ({
    ...state,
    selectedProject: selectDefaultProject(state),
  }),
  'destroy-session': () => emptySessionState,
};
