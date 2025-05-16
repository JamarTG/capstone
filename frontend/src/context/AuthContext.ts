import { createContext } from "react";
import type { Dispatch,SetStateAction } from "react";
import { User } from "../types/context";

export interface AuthContextType {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  isAuthenticated: boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
