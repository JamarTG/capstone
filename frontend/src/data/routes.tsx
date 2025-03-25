import Login from "../components/authentication/login";
import Register from "../components/authentication/register";
import SidebarLayout from "../components/layout/sidebar";
import Quiz from "../pages/quiz";
import QuizHistory from "../pages/archive";
import Settings from "../pages/settings";
import StudyPlan from "../pages/study-plan";
import NotFound from "../components/misc/not-found";
import { JSX, ReactNode } from "react";

interface RouteObject {
  path: string;
  element: JSX.Element;
  layout?: React.FC<{children: ReactNode}>;
}
type Routes = Record<string, RouteObject>;

const routes: Routes = {
  home: { path: "/", element: <StudyPlan />, layout: SidebarLayout },
  login: { path: "/login", element: <Login /> },
  register: { path: "/register", element: <Register /> },
  quizHistory: { path: "/quiz-history", element: <QuizHistory />, layout: SidebarLayout },
  quiz: { path: "/quiz", element: <Quiz />, layout: SidebarLayout },
  notFound: { path: "*", element: <NotFound /> },
  settings: { path: "/settings", element: <Settings />, layout: SidebarLayout },
};

export default routes;


// Type '{ children: Element; }' has no properties in common with type 'IntrinsicAttributes'.ts(2559)
// (parameter) Layout: React.FC<{}>