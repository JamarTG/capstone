import Login from "../components/authentication/login";
import Register from "../components/authentication/register";
import SidebarLayout from "../components/layout/sidebar";
import Dashboard from "../pages/dashboard";
import Quiz from "../pages/quiz";
import QuizHistory from "../pages/archive";
// import Settings from "../pages/settings";
import StudyPlan from "../pages/study-plan";
import NotFound from "../components/misc/not-found";

const routes = [
  { path: "/", element: <Dashboard />, layout: SidebarLayout },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/quiz-history", element: <QuizHistory />, layout: SidebarLayout },
  { path: "/quiz", element: <Quiz />, layout: SidebarLayout },
  // { path: "/settings", element: <Settings />, layout: SidebarLayout },
  { path: "/study-plan", element: <StudyPlan />, layout: SidebarLayout },
  { path: "*", element: <NotFound /> },
];

export default routes;
