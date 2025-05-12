import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { mainRoutes } from "./routes";
import { otherRoutes } from "./routes";
import AuthProvider from "./context/AuthProvider";
import { ThemeProvider } from "./context/ThemeProvider";
import { Toaster } from "react-hot-toast";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <ThemeProvider>
              <Routes
                location={location}
                key={location.pathname}
              >
                {Object.values({ ...mainRoutes, ...otherRoutes }).map(({ path, element, layout: Layout }) => {
                  return (
                    <Route
                      key={path}
                      path={path}
                      element={Layout ? <Layout>{element}</Layout> : element}
                    />
                  );
                })}
              </Routes>
            </ThemeProvider>
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  );
}

export default App;
