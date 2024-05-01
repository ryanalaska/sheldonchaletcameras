import React, { createContext, useReducer } from 'react';
import { User } from '../types/credential';

interface AuthState {
  isAuthenticated: boolean;
  isInitialized: boolean;
  user: User | null;
}

interface AuthContextValue extends AuthState {
  login(user:User|null) : void
  logout():void
}

const initialState : AuthContextValue = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  login:()=> {},
  logout :()=> {},
}

type LoginAction = { type: 'LOGIN', payload: User | null }
type LogoutAction = { type: 'LOGOUT' }

// Define the action type
type AuthAction =
  | LoginAction
  | LogoutAction;

// Define the reducer
const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isInitialized: true,
        isAuthenticated: action.payload !== null,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

// Create the context
const AuthContext = createContext<AuthContextValue>(initialState);

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (user:User|null) => dispatch({
    type: 'LOGIN',
    payload:user
  })

  const logout = () => dispatch({
    type: 'LOGOUT'
  })

  return (
    <AuthContext.Provider value={{...state,login,logout}}>
      {children}
    </AuthContext.Provider>
  );
};


export { AuthProvider };
export default AuthContext;
