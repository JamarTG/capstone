import Cookies from "js-cookie";

export const AUTH_TOKEN_CONFIG = {
  expires: 7 * 60 * 60 * 24,
  path: "/",
  secure: process.env.NODE_ENV === "production",
};

export const logout = () => {
  const { path } = AUTH_TOKEN_CONFIG;
  Cookies.remove("token", { path });
  localStorage.removeItem("user");
};

export const setAuthToken = (token: string) => {
  Cookies.set("token", token, AUTH_TOKEN_CONFIG);
}


