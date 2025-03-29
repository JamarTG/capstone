import { JSX, ReactNode } from "react";
import StudyPlan from "../pages/study-plan";
import Login from "../components/authentication/login";
import Register from "../components/authentication/register";
import QuizHistory from "../pages/archive";
import Quiz from "../pages/quiz";
import NotFound from "../pages/not-found";
import Settings from "../pages/settings";
import SidebarLayout from "../components/layout/sidebar";

interface RouteConfig {
  path: string;
  element: JSX.Element;
  layout?: React.FC<{ children: ReactNode }>;
}

type Route = "home" | "login" | "register" | "archive" | "quiz" | "settings" | "notFound";

const routes: Record<Route, RouteConfig> = {
  home: { path: "/", element: <StudyPlan />, layout: SidebarLayout },
  login: { path: "/login", element: <Login /> },
  register: { path: "/register", element: <Register /> },
  archive: { path: "/archive", element: <QuizHistory />, layout: SidebarLayout },
  quiz: { path: "/quiz", element: <Quiz />, layout: SidebarLayout },
  notFound: { path: "*", element: <NotFound /> },
  settings: { path: "/settings", element: <Settings />, layout: SidebarLayout },
};

export default routes;
