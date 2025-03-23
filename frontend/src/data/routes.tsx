import Login from "../components/authentication/login";
import Register from "../components/authentication/register";
import SidebarLayout from "../components/layout/sidebar";
import Quiz from "../pages/quiz";
import QuizHistory from "../pages/archive";
// import Settings from "../pages/settings";
import StudyPlan from "../pages/study-plan";
import NotFound from "../components/misc/not-found";

const routes = [
  { path: "/", element: <StudyPlan />, layout: SidebarLayout },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/quiz-history", element: <QuizHistory />, layout: SidebarLayout },
  { path: "/quiz", element: <Quiz />, layout: SidebarLayout },
  { path: "*", element: <NotFound /> },
];

export default routes;
