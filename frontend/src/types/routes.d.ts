import type { FC } from "react";

type MainNavPath = "/" | "/quiz" | "/archive" | "/feedback";
type MainNavName = "home" | "quiz" | "archive" | "feedback" | "profile" | "settings" | "logout";

export interface MainNavItem {
  path: MainNavPath;
  name: MainNavName;
}

export interface RouteConfig {
  path: string;
  element?: JSX.Element;
  layout?: FC<{ children: ReactNode }>;
  text: string;
  icon?: string;
}
