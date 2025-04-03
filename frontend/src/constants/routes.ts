import { MainNavItem } from "../types/routes";

export const ROUTE_PATHS = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  QUIZ: "/quiz",
  ARCHIVE: "/archive",
  SETTINGS: "/settings",
  QUIZ_TAKING: "/quiz/:id",
  NOT_FOUND: "*",
} as const;


export const MAIN_NAV_ITEMS : MainNavItem[] = [
  { path: "/", name: "home" },
  { path: "/quiz", name: "quiz" },
  { path: "/archive", name: "archive" },
];

export type RouteName = keyof typeof ROUTE_PATHS;
