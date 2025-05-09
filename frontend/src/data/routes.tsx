import { JSX, ReactNode } from "react";
import StudyPlan from "../pages/Dashboard";
import Login from "../components/auth/login";
import Register from "../components/auth/register";
import Archive from "../pages/Archive";
import Quiz from "../pages/Quiz";
import NotFound from "../pages/NotFound";
import Settings from "../pages/Settings";
import SidebarLayout from "../components/layout/Sidebar";
import Assessment from "../pages/Quiz/QuizSession";
import QuizReview from "../pages/Review";

import { MDI_ICONS } from "../icons";

export interface RouteConfig {
  path: string;
  element?: JSX.Element;
  layout?: React.FC<{ children: ReactNode }>;
  text: string;
  icon?: string;
}

const mainRoutes: Record<string, RouteConfig> = {
  HOME: {
    path: "/",
    element: <StudyPlan />,
    layout: SidebarLayout,
    text: "Dashboard",
    icon: MDI_ICONS.viewDashboard,
  },
  ARCHIVE: {
    path: "/archive",
    element: <Archive />,
    layout: SidebarLayout,
    text: "Archive",
    icon: MDI_ICONS.archive,
  },
  QUIZ: {
    path: "/quiz",
    element: <Quiz />,
    layout: SidebarLayout,
    text: "Quiz",
    icon: MDI_ICONS.clipboardList,
  },
};

const otherRoutes: Record<string, RouteConfig> = {
  LOGIN: {
    path: "/login",
    element: <Login />,
    text: "Login",
  },
  REGISTER: {
    path: "/register",
    element: <Register />,
    text: "Register",
  },
  ASSESSMENT: {
    path: "/quiz/:id",
    element: <Assessment />,
    layout: SidebarLayout,
    text: "Assessment",
  },
  SETTINGS: {
    path: "/settings",
    element: <Settings />,
    layout: SidebarLayout,
    text: "Settings",
    icon: MDI_ICONS.cog,
  },
  QUIZ_REVIEW: {
    path: "/review/:id",
    element: <QuizReview />,
    layout: SidebarLayout,
    text: "Quiz Review",
  },

  LOGOUT: {
    path: "/logout",
    text: "Logout",
    icon: MDI_ICONS.logout,
  },
  NOT_FOUND: {
    path: "*",
    element: <NotFound />,
    layout: SidebarLayout,
    text: "Not Found",
  },
};

const routes = { ...mainRoutes, ...otherRoutes };

export { mainRoutes, otherRoutes };
export default routes;
