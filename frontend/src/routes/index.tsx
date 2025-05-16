import SidebarLayout from "../components/layout/Sidebar";
import Dashboard from "../pages/Dashboard";
import { IconifyIcons } from "../icons";
import Archive from "../pages/Archive";
import Quiz from "../pages/Quiz";
import NotFound from "../pages/NotFound";
import Login from "../components/auth/login";
import Register from "../components/auth/register";
import QuizReview from "../pages/Review";
import Settings from "../pages/Settings";
import type { RouteConfigObject } from "./types";
import QuizSession from "../pages/Quiz/QuizSession";

export const mainRoutes: RouteConfigObject = {
  HOME: {
    path: "/",
    element: <Dashboard/>,
    layout: SidebarLayout,
    text: "Dashboard",
    icon: IconifyIcons.viewDashboard,
  },
  ARCHIVE: {
    path: "/archive",
    element: <Archive />,
    layout: SidebarLayout,
    text: "Archive",
    icon: IconifyIcons.archive,
  },
  QUIZ: {
    path: "/quiz",
    element: <Quiz />,
    layout: SidebarLayout,
    text: "Quiz",
    icon: IconifyIcons.clipboardList,
  },
};

export const otherRoutes: RouteConfigObject = {
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
    element: <QuizSession />,
    layout: SidebarLayout,
    text: "Assessment",
  },
  SETTINGS: {
    path: "/settings",
    element: <Settings  />,
    layout: SidebarLayout,
    text: "Settings",
    icon: IconifyIcons.cog,
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
    icon: IconifyIcons.logout,
  },
  NOT_FOUND: {
    path: "*",
    element: <NotFound />,
    layout: SidebarLayout,
    text: "Not Found",
  },
};


const routes = {...mainRoutes,...otherRoutes};
export default routes;