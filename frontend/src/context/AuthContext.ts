import { createContext } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { authTypes } from "@/types";

export interface AuthContextType {
  user: authTypes.AuthUser | null;
  setUser: Dispatch<SetStateAction<authTypes.AuthUser | null>>;
  isAuthenticated: boolean;
  logout: VoidFunction;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
