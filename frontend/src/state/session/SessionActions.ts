import {
  UserResponse,
  SessionResponse,
  ProjectResponse,
  AnaltyicsResponse,
} from '../../../../shared';
import { SessionState, SessionDispatch } from './SessionProvider';
import { identifyLogrocket } from '../../utils/logrocket';

export type SessionActionNames =
  | 'saveSession'
  | 'saveUser'
  | 'saveProject'
  | 'destroySession';

export interface SessionActions {
  saveSession: (payload: SessionResponse) => void;
  saveAnalytics: (payload: AnaltyicsResponse) => void;
  saveUser: (payload: UserResponse) => void;
  saveProject: (payload: ProjectResponse) => void;
  destroySession: () => void;
}

export const sessionActions = (
  state: SessionState,
  dispatch: SessionDispatch<any>
) => ({
  saveSession: (payload: SessionResponse) => {
    identifyLogrocket(payload.session.user);
    dispatch({ name: 'set-session', payload });
  },
  saveAnalytics: (payload: AnaltyicsResponse) =>
    dispatch({ name: 'set-analytics', payload }),

  saveUser: (payload: UserResponse) => dispatch({ name: 'set-user', payload }),
  saveProject: (payload: ProjectResponse) =>
    dispatch({ name: 'set-project', payload }),

  destroySession: () => dispatch({ name: 'destroy-session' }),
});
