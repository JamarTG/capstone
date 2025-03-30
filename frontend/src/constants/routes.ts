export const ROUTE_PATHS = {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    QUIZ: "/quiz",
    ARCHIVE: "/archive",
    SETTINGS: "/settings",
    NOT_FOUND: "*",
  } as const;
  

export type RouteName = keyof typeof ROUTE_PATHS; 