import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SidebarLayout from "./components/layout/sidebar";
import Login from "./components/authentication/login";
import Register from "./components/authentication/register";
import QuizHistory from "./pages/quiz-history";
import Quiz from "./pages/Quiz";
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
              <StudyPlan
                weakAreas={[
                  { topic: "Computer Fundamentals and Information Processing", weakPercentage: 70 },
                  { topic: "Computer Networks and Web Technologies", weakPercentage: 80 },
                  { topic: "Social and Economic Impact of Information and Communications Technology", weakPercentage: 65 },
                  { topic: "Word-Processing and Web Page Design", weakPercentage: 65 },
                  { topic: "Spreadsheets", weakPercentage: 65 },
                  { topic: "Database Management", weakPercentage: 65 },
                  { topic: "Problem-Solving and Program Design", weakPercentage: 65 },
                  { topic: "Program Implementation", weakPercentage: 65 },
                ]}
                onRetakeQuiz={(topic: string) => {
                  console.log(`Retaking quiz for topic: ${topic}`);
                  // Add your logic here to handle quiz retake
                }}
              />
            </SidebarLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
