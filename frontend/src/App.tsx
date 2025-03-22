import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SidebarLayout from "./components/layout/sidebar";
import Login from "./components/authentication/login";
import Register from "./components/authentication/register";
import QuizHistory from "./pages/quiz-history";
import Quiz from "./pages/quiz";
import Settings from "./pages/settings";
import StudyPlan from "./pages/study-plan";
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <SidebarLayout>
              <Dashboard />
            </SidebarLayout>
          }
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/quiz-history"
          element={
            <SidebarLayout>
              <QuizHistory />
            </SidebarLayout>
          }
        />
        <Route
          path="/quiz"
          element={
            <SidebarLayout>
              <Quiz />
            </SidebarLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <SidebarLayout>
              <Settings />
            </SidebarLayout>
          }
        />

        <Route
          path="/study-plan"
          element={
            <SidebarLayout>
              <StudyPlan />
            </SidebarLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
