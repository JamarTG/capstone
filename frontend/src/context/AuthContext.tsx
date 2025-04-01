import { createContext, SetStateAction, ReactNode, useState, useEffect } from "react";
import { User } from "../types/context";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { AuthAPI } from "../utils/api";

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<SetStateAction<User | null>>;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface UserSuccessResponse {
  message: string;
  user?: {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: string;
    __v: string;
  };
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const shouldCheckAuth = !["/login", "/register"].includes(location.pathname);

  const { data, isSuccess }: UseQueryResult<UserSuccessResponse | null, Error> = useQuery({
    queryKey: ["check-auth"],
    queryFn: shouldCheckAuth ? AuthAPI.checkAuth : () => null,
    staleTime: 5 * 10 * 1000,
    enabled: shouldCheckAuth
  });

  useEffect(() => {
    if (isSuccess && data?.user) {
      const { _id, firstName, lastName, email } = data.user;
      setUser({ _id, firstName, lastName, email });
      localStorage.setItem("user", JSON.stringify(data.user));
    }
  }, [isSuccess, data]);

  return <AuthContext.Provider value={{ user, setUser, isAuthenticated: !!user }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
