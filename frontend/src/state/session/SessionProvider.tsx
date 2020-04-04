import React, {
  useReducer,
  useContext,
  FunctionComponent,
  Context,
  Dispatch,
} from 'react';
import { UserDto, ProjectDto } from '../../../../shared';
import { sessionActions, SessionActions } from './SessionActions';
import { sessionReducers, SessionReducerNames } from './SessionReducers';

export type SessionDispatch<T> = Dispatch<{
  name: SessionReducerNames;
  payload?: T;
}>;

export interface SessionState {
  user: UserDto | Partial<UserDto>;
  projects: ProjectDto[];
  selectedProjectIndex: number;
}

export const emptySessionState: SessionState = {
  user: {},
  projects: [],
  selectedProjectIndex: 0,
};

const SessionStateContext: Context<SessionState> = React.createContext<
  SessionState
>(emptySessionState);

const SessionActionsContext: Context<SessionActions> = React.createContext<
  SessionActions
>({} as SessionActions);

const middleware = (
  state: SessionState,
  { name, payload }: { name: SessionReducerNames; payload?: any }
) => {
  const nextState = sessionReducers[name](state, payload);
  console.log({
    name,
    payload,
    previousState: JSON.parse(JSON.stringify(state)),
    nextState: JSON.parse(JSON.stringify(nextState)),
  });
  return nextState;
};

const sessionActionsReducer = (
  state: SessionState,
  sessionDispatch: { name: SessionReducerNames; payload?: any }
) => {
  if (!sessionReducers[sessionDispatch.name])
    throw new Error(`reducer ${sessionDispatch.name} not defined`);
  return { ...middleware(state, sessionDispatch) };
};

export const SessionProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(
    sessionActionsReducer,
    emptySessionState
  );

  return (
    <SessionStateContext.Provider value={state}>
      <SessionActionsContext.Provider value={sessionActions(state, dispatch)}>
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
