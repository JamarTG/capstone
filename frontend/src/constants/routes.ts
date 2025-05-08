import { mdiAccountOutline, mdiArchiveOutline, mdiClipboardListOutline, mdiCogOutline, mdiCommentOutline, mdiLogout, mdiViewDashboardOutline } from "@mdi/js";
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
} as const;


export const NAV_TEXTS: Record<string, string> = {
  home: "Dashboard",
  quiz: "Quizzes",
  archive: "Archive",
  profile: "Profile",
  settings: "Settings",
  logout: "Logout",
  feedback: "Feedback",
};


export const NAV_ICONS: Record<string, string> = {
  home: mdiViewDashboardOutline,
  quiz: mdiClipboardListOutline,
  archive: mdiArchiveOutline,
  profile: mdiAccountOutline,
  settings: mdiCogOutline,
  logout: mdiLogout,
  feedback: mdiCommentOutline,
};

export const MAIN_NAV_ITEMS : MainNavItem[] = [
  { path: "/", name: "home" },
  { path: "/quiz", name: "quiz" },
  { path: "/archive", name: "archive" },

];

export type RouteName = keyof typeof ROUTE_PATHS;
