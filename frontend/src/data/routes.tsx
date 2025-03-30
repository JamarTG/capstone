import { JSX, ReactNode } from "react";
import StudyPlan from "../pages/StudyPlanPage";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Archive from "../pages/ArchivePage";
import Quiz from "../pages/QuizPage";
import NotFound from "../pages/NotFoundPage";
import Settings from "../pages/SettingsPage";
import SidebarLayout from "../components/layout/SidebarLayout";
import { ROUTE_PATHS, RouteName } from "../constants/routes";

interface RouteConfig {
  path: string;
  element: JSX.Element;
  layout?: React.FC<{ children: ReactNode }>;
}

const routes: Record<RouteName, RouteConfig> = {
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
  SETTINGS: {
    path: ROUTE_PATHS.SETTINGS,
    element: <Settings />,
    layout: SidebarLayout,
  },
  NOT_FOUND: {
    path: ROUTE_PATHS.NOT_FOUND,
    element: <NotFound />,
  },
};

export default routes;
