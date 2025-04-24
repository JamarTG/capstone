export const AUTH_TOKEN_CONFIG = {
  expires: 7 * 24 * 60 * 60,
  path: "/",
  secure: process.env.NODE_ENV === "production",
};

