import { MainNavItem } from "../types/routes";

export const ROUTE_PATHS = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  QUIZ: "/quiz",
  ARCHIVE: "/archive",
  SETTINGS: "/settings",
  ASSESSMENT: "/quiz/:id",
  QUIZ_REVIEW: "/review/:id",
  NOT_FOUND: "*",
  FEEDBACK: "/feedback",
} as const;


export const MAIN_NAV_ITEMS : MainNavItem[] = [
  { path: "/", name: "home" },
  { path: "/quiz", name: "quiz" },
  { path: "/archive", name: "archive" },
  {path: "/feedback", name: "feedback"},
];

export type RouteName = keyof typeof ROUTE_PATHS;
