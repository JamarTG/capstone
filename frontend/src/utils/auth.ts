import Cookies from "js-cookie";
import { User } from "../types/context";

export const AUTH_TOKEN_CONFIG = {
  expires: 7 * 24 * 60 * 60,
  path: "/",
  secure: process.env.NODE_ENV === "production",
};

export const setAuthToken = (token: string) => {
  Cookies.set("token", token, { expires: 7 });
};

export const getAuthToken = () => {
  return Cookies.get("token");
};

export const setUserData = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUserData = (): User | null => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const removeAuthData = () => {
  Cookies.remove("token");
  localStorage.removeItem("user");
};

