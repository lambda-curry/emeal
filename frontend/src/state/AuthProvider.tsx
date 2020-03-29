import React, {
  useReducer,
  useContext,
  FunctionComponent,
  Context
} from 'react';

interface AuthState {
  isAuthenticated: boolean;
}

interface AuthReducers {
  [x: string]: (state: AuthState, isAuthenticated: boolean) => AuthState;
}

interface AuthActions {
  setAuthentication: (isAuthenticated: boolean) => void;
}

const AuthStateContext: Context<AuthState> = React.createContext<AuthState>(
  {} as AuthState
);

const AuthActionsContext: Context<AuthActions> = React.createContext<
  AuthActions
>({} as AuthActions);

const authReducers: AuthReducers = {
  'set-authentication': (state: AuthState, isAuthenticated: boolean) => {
    return { ...state, isAuthenticated };
  }
};

const authActionsReducer = (
  currentState: AuthState,
  { name, payload }: { name: string; payload: boolean }
) => {
  if (!authReducers[name]) throw new Error('Action not defined');
  return authReducers[name](currentState, payload);
};

export const AuthProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(authActionsReducer, {
    isAuthenticated: false
  });

  const actions = {
    setAuthentication: (isAuthenticated: boolean) =>
      dispatch({ name: 'set-authentication', payload: isAuthenticated })
  };

  return (
    <AuthStateContext.Provider value={state}>
      <AuthActionsContext.Provider value={actions}>
        {children}
      </AuthActionsContext.Provider>
    </AuthStateContext.Provider>
  );
};

export const useAuth = () => {
  const state = useContext(AuthStateContext);
  const actions = useContext(AuthActionsContext);
  return { state, actions };
};
