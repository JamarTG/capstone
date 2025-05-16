import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { AuthUser } from "../types/auth";

export interface AuthContextType {
  user: AuthUser | null;
  setUser: Dispatch<SetStateAction<AuthUser | null>>;
  isAuthenticated: boolean;
  logout: VoidFunction;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
