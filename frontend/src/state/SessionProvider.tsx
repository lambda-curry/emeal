import React, {
  useReducer,
  useContext,
  FunctionComponent,
  Context,
  Dispatch
} from 'react';
import { UserDto } from '../../../shared';

interface SessionState {
  user: UserDto | null;
}

interface SessionReducers {
  [x: string]: (state: SessionState, payload: any) => SessionState;
}

const SessionStateContext: Context<SessionState> = React.createContext<
  SessionState
>({} as SessionState);

const SessionActionsContext: Context<SessionActions> = React.createContext<
  SessionActions
>({} as SessionActions);

const sessionReducers: SessionReducers = {
  'set-user': (state: SessionState, user: UserDto) => {
    return { ...state, user };
  }
};

class SessionActions {
  constructor(
    private state: SessionState,
    private dispatch: Dispatch<{
      name: string;
      payload: any;
    }>
  ) {}

  saveUser(payload: UserDto) {
    this.dispatch({ name: 'set-user', payload });
  }

  removeUser() {
    this.dispatch({ name: 'remove-user', payload: null });
  }
}

class SessionSelectors {
  constructor(private state: SessionState) {}

  get isAuthenticated() {
    return !!this.state.user;
  }
}

const sessionActionsReducer = (
  currentState: SessionState,
  { name, payload }: { name: string; payload: any }
) => {
  if (!sessionReducers[name]) throw new Error('Action not defined');
  return { ...sessionReducers[name](currentState, payload) };
};

export const SessionProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(sessionActionsReducer, {
    user: null
  });

  return (
    <SessionStateContext.Provider value={state}>
      <SessionActionsContext.Provider
        value={new SessionActions(state, dispatch)}
      >
        {children}
      </SessionActionsContext.Provider>
    </SessionStateContext.Provider>
  );
};

export const useSession = () => {
  const state = useContext(SessionStateContext);
  const actions = useContext(SessionActionsContext);
  const selectors = new SessionSelectors(state);
  return { state, actions, selectors };
};
