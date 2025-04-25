import { JSX, ReactNode } from "react";
import StudyPlan from "../pages/Dashboard";
import Login from "../components/auth/login";
import Register from "../components/auth/register";
import Archive from "../pages/Archive";
import Quiz from "../pages/Quiz";
import NotFound from "../pages/NotFound";
import Settings from "../pages/Settings";
import SidebarLayout from "../components/layout/Sidebar";
import { ROUTE_PATHS } from "../constants/routes";

import Assessment from "../pages/Quiz/QuizSession";
import QuizReview from "../pages/Quiz/QuizReview";

interface RouteConfig {
  path: string;
  element: JSX.Element;
  layout?: React.FC<{ children: ReactNode }>;
}

const routes: Record<string, RouteConfig> = {
  HOME: {
    path: ROUTE_PATHS.HOME,
    element: <StudyPlan />,
    layout: SidebarLayout,
  },
  LOGIN: {
    path: ROUTE_PATHS.LOGIN,
    element: <Login />,
  },
  REGISTER: {
    path: ROUTE_PATHS.REGISTER,
    element: <Register />,
  },
  ARCHIVE: {
    path: ROUTE_PATHS.ARCHIVE,
    element: <Archive />,
    layout: SidebarLayout,
  },
  QUIZ: {
    path: ROUTE_PATHS.QUIZ,
    element: <Quiz />,
    layout: SidebarLayout,
  },
  ASSESSMENT: {
    path: ROUTE_PATHS.ASSESSMENT,
    element: <Assessment />,
    layout: SidebarLayout,
  },
  SETTINGS: {
    path: ROUTE_PATHS.SETTINGS,
    element: <Settings />,
    layout: SidebarLayout,
  },
  REVIEW: {
    path: ROUTE_PATHS.QUIZ_REVIEW,
    element: <QuizReview />,
    layout: SidebarLayout,
  },
  NOT_FOUND: {
    path: ROUTE_PATHS.NOT_FOUND,
    element: <NotFound />,
    layout: SidebarLayout,
  },
};

export default routes;
