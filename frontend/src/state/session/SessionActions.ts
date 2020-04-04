import {
  UserResponse,
  SessionResponse,
  ProjectResponse,
} from '../../../../shared';
import { SessionState } from './SessionProvider';
import { SessionReducerNames } from './SessionReducers';

export type SessionActionNames =
  | 'saveSession'
  | 'saveUser'
  | 'saveProject'
  | 'destroySession';

export type SessionActions = {
  [key in SessionActionNames]: (payload: any) => void;
};

// export type SessionActionsCreator = <T>(
//   state: SessionState,
//   dispatch: SessionDispatch<T>
// ) => SessionActions;

export const sessionActions = (
  state: SessionState,
  dispatch: (sessionDispatch: {
    name: SessionReducerNames;
    payload?: any;
  }) => void
) => ({
  saveSession: (payload: SessionResponse) =>
    dispatch({ name: 'set-session', payload }),

  saveUser: (payload: UserResponse) => dispatch({ name: 'set-user', payload }),

  saveProject: (payload: ProjectResponse) =>
    dispatch({ name: 'set-project', payload }),

  destroySession: () => dispatch({ name: 'destroy-session' }),
});
