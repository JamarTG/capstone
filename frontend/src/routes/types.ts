import type { FC, JSX, ReactNode } from "react";

type MainNavPath = "/" | "/quiz" | "/archive" | "/feedback";
type MainNavName =
  | "home"
  | "quiz"
  | "archive"
  | "feedback"
  | "profile"
  | "settings"
  | "logout";

export type RouteConfigObject = Record<string, RouteConfig>;

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
