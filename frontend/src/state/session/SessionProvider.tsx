import React, {
  useReducer,
  useContext,
  FunctionComponent,
  Context,
  Dispatch,
} from 'react';
import { UserDto, ProjectDto } from '../../../../shared';
import { SessionActions, SessionActionsType } from './SessionActions';
import { sessionReducers, SessionReducerNames } from './SessionReducers';

export type SessionDispatch = Dispatch<{
  name: SessionReducerNames;
  payload?: any;
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

const SessionActionsContext: Context<SessionActionsType> = React.createContext<
  SessionActionsType
>({} as SessionActionsType);

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
  dispatched: { name: SessionReducerNames; payload?: any }
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
      <SessionActionsContext.Provider value={SessionActions(state, dispatch)}>
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
