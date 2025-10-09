import type { CustomerDetailDto } from "@/services/types/api-types";
import React, { createContext, ReactNode, useContext, useReducer } from "react";

interface AuthState {
  isAuthenticated: boolean;
  userData: CustomerDetailDto | null;
}

type AuthAction =
  | { type: "login"; payload: CustomerDetailDto }
  | { type: "logout" }
  | { type: "redeem-free-coffee" };

interface AuthContextValue {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "login":
      return {
        isAuthenticated: true,
        userData: action.payload,
      };
    case "logout":
      return {
        isAuthenticated: false,
        userData: null,
      };
    case "redeem-free-coffee":
      if (!state.userData || (state.userData.currentCoffees ?? 0) < 10)
        return state;
      return {
        ...state,
        userData: {
          ...state.userData,
          currentCoffees: (state.userData.currentCoffees ?? 0) - 10,
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
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
