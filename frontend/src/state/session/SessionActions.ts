import {
  UserResponse,
  SessionResponse,
  ProjectResponse,
} from '../../../../shared';
import { SessionState, SessionDispatch } from './SessionProvider';

export type SessionActionNames =
  | 'saveSession'
  | 'saveUser'
  | 'saveProject'
  | 'destroySession';

export interface SessionActions {
  saveSession: (payload: SessionResponse) => void;
  saveUser: (payload: UserResponse) => void;
  saveProject: (payload: ProjectResponse) => void;
  destroySession: () => void;
}

export const sessionActions = (
  state: SessionState,
  dispatch: SessionDispatch<any>
) => ({
  saveSession: (payload: SessionResponse) =>
    dispatch({ name: 'set-session', payload }),

  saveUser: (payload: UserResponse) => dispatch({ name: 'set-user', payload }),

  saveProject: (payload: ProjectResponse) =>
    dispatch({ name: 'set-project', payload }),

  destroySession: () => dispatch({ name: 'destroy-session' }),
});
