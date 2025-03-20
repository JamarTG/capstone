import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeLayout from "./components/layout/home";
import QuizResult from "./components/quiz/quiz-result";
import Login from "./components/authentication/login";
import Register from "./components/authentication/register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <HomeLayout>
              <QuizResult />
            </HomeLayout>
          }
        />
        <Route
          path="/login"
          element={<Login/>}
        />
        <Route
          path="/register"
          element={<Register/>}
        />
        <Route
          path="/assessment"
          element={<></>}
        />
        <Route
          path="/history"
          element={<></>}
        />
        <Route
          path="/insights"
          element={<HomeLayout><></></HomeLayout>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
