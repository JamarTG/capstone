import { createContext } from "react";
import type { Dispatch,SetStateAction } from "react";
import type { User } from "../types/context";

export interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isAuthenticated: boolean;
  logout: VoidFunction;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
