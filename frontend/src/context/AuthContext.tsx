import { createContext, SetStateAction, ReactNode, useState, useEffect } from "react";
import { User } from "../types/context";
import { useQuery } from "@tanstack/react-query";
import { AuthAPI } from "../utils/api";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { UserSuccessResponse } from "../types/auth";

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<SetStateAction<User | null>>;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const token = Cookies.get("token");

  const isAuthenticated = !!user && !!token; 

  const { data, isSuccess } = useQuery<UserSuccessResponse | null, Error>({
    queryKey: ["check-auth"],
    queryFn: AuthAPI.checkAuth,
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (isSuccess && data?.user) {
      toast.success(data.message);
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
  }, [isSuccess, data, setUser]);

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
