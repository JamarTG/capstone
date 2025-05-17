import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SidebarLayout from "./components/layout/Sidebar";
import { ThemeProvider } from "./context/ThemeProvider";
import QuizSession from "./pages/Quiz/QuizSession";
import Register from "./components/auth/register";
import AuthProvider from "./context/AuthProvider";
import Login from "./components/auth/login";
import Dashboard from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import QuizReview from "./pages/Review";
import Archive from "./pages/Archive";
import Quiz from "./pages/Quiz";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <ThemeProvider>
              <Routes>
                <Route element={<SidebarLayout />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/archive" element={<Archive />} />
                  <Route path="/quiz" element={<Quiz />} />
                  <Route path="/quiz/:id" element={<QuizSession />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/review/:id" element={<QuizReview />} />
                  <Route path="*" element={<NotFound />} />
                </Route>

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />
              </Routes>
            </ThemeProvider>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
