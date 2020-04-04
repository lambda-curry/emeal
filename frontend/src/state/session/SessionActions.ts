import { UserResponse, SessionResponse } from '../../../../shared';
import { SessionState } from './SessionProvider';
import { Dispatch } from 'react';

export class SessionActions {
  constructor(
    private state: SessionState,
    private dispatch: Dispatch<{
      name: string;
      payload?: any;
    }>
  ) {}

  saveSession(payload: SessionResponse) {
    this.dispatch({ name: 'set-session', payload });
    this.dispatch({ name: 'select-default-project' });
  }

  saveUser(payload: UserResponse) {
    this.dispatch({ name: 'set-user', payload });
  }

  destroySession() {
    this.dispatch({ name: 'destroy-session' });
  }
}
