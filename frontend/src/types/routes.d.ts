type MainNavPath = "/" | "/quiz" | "/archive";

type MainNavName = "home" | "quiz" | "archive"

export interface MainNavItem {
  path: MainNavPath;
  name : MainNavName
}