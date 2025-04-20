type MainNavPath = "/" | "/quiz" | "/archive" | "/feedback";
type MainNavName = "home" | "quiz" | "archive" | "feedback" | "profile" | "settings" | "logout";

export interface MainNavItem {
  path: MainNavPath;
  name : MainNavName
}