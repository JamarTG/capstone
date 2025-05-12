import { ReactNode, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { useQuery } from "@tanstack/react-query";
import { AuthAPI } from "../utils/api";
import Cookies from "js-cookie";
import { AUTH_TOKEN_CONFIG } from "../utils/auth";
import { User } from "../types/context";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const handleLogout = () => {
    Cookies.remove("token", { path: AUTH_TOKEN_CONFIG.path });
    localStorage.removeItem("user");
    setUser(null);
  };

  const isAuthenticated = !!user;

  const { data, isSuccess } = useQuery({
    queryKey: ["check-auth"],
    queryFn: AuthAPI.checkAuth,
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (isSuccess && data?.user) {
      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
    }
  }, [isSuccess, data]);

  return (
    <AuthContext.Provider value={{ user, setUser, isAuthenticated, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
