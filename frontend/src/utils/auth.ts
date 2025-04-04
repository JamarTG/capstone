import Cookies from "js-cookie";

export const AUTH_TOKEN_CONFIG = {
  expires: 7 * 24 * 60 * 60, // 7 days in seconds
  path: "/",
  secure: process.env.NODE_ENV === "production",
};

export const setAuthToken = (token: string) => {
  Cookies.set("token", token, AUTH_TOKEN_CONFIG);
};

export const getAccessToken = () => {
  return Cookies.get("token");
};

export const removeSessionVars = () => {
  Cookies.remove("token", { path: AUTH_TOKEN_CONFIG.path });
  localStorage.removeItem("user"); 
};


