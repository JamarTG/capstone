import { JSX, ReactNode } from "react";
import StudyPlan from "../pages/StudyPlanPage";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import QuizHistory from "../pages/ArchivePage";
import Quiz from "../pages/QuizPage";
import NotFound from "../pages/NotFoundPage";
import Settings from "../pages/SettingsPage";
import SidebarLayout from "../components/layout/SidebarLayout";

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
