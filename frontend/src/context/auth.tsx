import { createContext, SetStateAction, ReactNode, useState, useEffect } from "react";
import { User } from "../types/context";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { checkAuth } from "../utils/api";

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<SetStateAction<User | null>>;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
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
  const [user, setUser] = useState<User | null>(null);

  const { data, isSuccess, isLoading,isFetching, isError }: UseQueryResult<UserSuccessResponse | null, Error> = useQuery({
    queryKey: ["check-auth"],
    queryFn: checkAuth,
    staleTime : 5 * 10 * 1000
  });

  useEffect(() => {
    if (isSuccess && data?.user) {

      const { _id, firstName, lastName, email } = data.user;

      setUser({
        _id,
        firstName,
        lastName,
        email,
      });
    } 
  }, [isSuccess, data]);

  return <AuthContext.Provider value={{ user, setUser, isLoading, isError, isFetching }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
