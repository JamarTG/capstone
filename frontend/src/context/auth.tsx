import { createContext, SetStateAction, ReactNode, useState, useEffect } from "react";
import { User } from "../types/context";
import {BASE_URL} from "../utils/api"

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<SetStateAction<User | null>>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`${BASE_URL}/auth/check-auth`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "User is authenticated") {
          setUser(data.user);
        }
      })
      .catch((error) => {
        console.error("Error checking authentication", error);
      });
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
