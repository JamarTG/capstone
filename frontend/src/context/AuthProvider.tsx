import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "./AuthContext";
import { useState, useEffect } from "react";
import type { FC, ReactNode } from "react";
import { AuthAPI } from "@/api";

import { AUTH_TOKEN_CONFIG } from "../constants";
import type { authTypes } from "@/types";
import Cookies from "js-cookie";
import useSetUser from "@/hooks/useSetUser";
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({
  children,
}: AuthProviderProps) => {
  const [user, setUser] = useState<authTypes.AuthUser | null>(() => {
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

  useSetUser(isSuccess, setUser, data);

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
