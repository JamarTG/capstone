import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SidebarLayout from "./components/layout/sidebar";
import Login from "./components/authentication/login";
import Register from "./components/authentication/register";
import QuizHistory from "./pages/quiz-history";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <SidebarLayout>
              <QuizHistory/>
            </SidebarLayout>
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
          element={<SidebarLayout><></></SidebarLayout>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
