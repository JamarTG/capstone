import { createContext, SetStateAction, ReactNode, useState, useEffect } from "react";
import { User } from "../types/context";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { checkAuth } from "../utils/api";

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<SetStateAction<User | null>>;
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

  const { data, isSuccess}: UseQueryResult<UserSuccessResponse | null, Error> = useQuery({
    queryKey: ["check-auth"],
    queryFn: checkAuth,
  });

  useEffect(() => {
    if (isSuccess && data?.user) {
      setUser({
        _id: data.user._id ?? "randomid",
        firstName: data.user.firstName ?? "",
        lastName: data.user.lastName ?? "",
        email: data.user.email ?? "",
      });
    }
  }, [isSuccess, data]);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
