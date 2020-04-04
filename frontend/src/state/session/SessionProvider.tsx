import React, {
  useReducer,
  useContext,
  FunctionComponent,
  Context,
  Dispatch,
} from 'react';
import { UserDto, ProjectDto } from '../../../../shared';
import { SessionActions } from './SessionActions';
import { sessionReducers } from './SessionReducers';

export interface SessionState {
  user: UserDto | Partial<UserDto>;
  projects: ProjectDto[];
  selectedProject?: string;
}

export const emptySessionState: SessionState = {
  user: {},
  projects: [],
};

const SessionStateContext: Context<SessionState> = React.createContext<
  SessionState
>(emptySessionState);

const SessionActionsContext: Context<SessionActions> = React.createContext<
  SessionActions
>({} as SessionActions);

const middleware = (
  previousState: SessionState,
  { name, payload }: { name: string; payload?: any }
) => {
  const nextState = sessionReducers[name](previousState, payload);
  console.log({ name, payload, previousState, nextState });
  return nextState;
};

const sessionActionsReducer = (
  state: SessionState,
  dispatched: { name: string; payload?: any }
) => {
  if (!sessionReducers[dispatched.name])
    throw new Error(`reducer ${dispatched.name} not defined`);
  return { ...middleware(state, dispatched) };
};

export const SessionProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(
    sessionActionsReducer,
    emptySessionState
  );

  return (
    <SessionStateContext.Provider value={state}>
      <SessionActionsContext.Provider
        value={new SessionActions(state, dispatch as React.Dispatch<any>)}
      >
        {children}
      </SessionActionsContext.Provider>
    </SessionStateContext.Provider>
  );
};

export const useSession = () => {
  const state = useContext(SessionStateContext);
  const actions = useContext(SessionActionsContext);
  return { state, actions };
};
