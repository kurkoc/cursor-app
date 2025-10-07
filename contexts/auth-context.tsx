import React, { createContext, ReactNode, useContext, useReducer } from 'react';

export interface Order {
  id: string;
  date: string;
  items: string[];
  total: number;
}

export interface UserData {
  phoneNumber: string;
  coffeeCount: number;
  orders: Order[];
  qrCode: string;
  profile?: {
    id?: string;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    currentCoffees?: number;
    birthDate?: string;
    pendingRewards?: number;
    rewardLimit?: number;
  };
}

interface AuthState {
  isAuthenticated: boolean;
  userData: UserData | null;
}

type AuthAction =
  | { type: 'login'; payload: UserData }
  | { type: 'logout' }
  | { type: 'add-order'; payload: Order }
  | { type: 'redeem-free-coffee' };

interface AuthContextValue {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'login':
      return {
        isAuthenticated: true,
        userData: action.payload,
      };
    case 'logout':
      return {
        isAuthenticated: false,
        userData: null,
      };
    case 'add-order':
      if (!state.userData) return state;
      return {
        ...state,
        userData: {
          ...state.userData,
          coffeeCount: state.userData.coffeeCount + 1,
          orders: [action.payload, ...state.userData.orders],
        },
      };
    case 'redeem-free-coffee':
      if (!state.userData || state.userData.coffeeCount < 10) return state;
      return {
        ...state,
        userData: {
          ...state.userData,
          coffeeCount: state.userData.coffeeCount - 10,
        },
      };
    default:
      return state;
  }
}

const initialState: AuthState = {
  isAuthenticated: false,
  userData: null,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

