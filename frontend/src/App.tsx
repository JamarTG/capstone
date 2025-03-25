import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import routes from "./data/routes";
import AuthProvider from "./context/auth";
import RenderList from "./components/common/render-list";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <RenderList
                data={Object.values(routes)}
                renderFn={({ path, element, layout: Layout }) => (
                  <Route
                    key={path}
                    path={path}
                    element={
                      Layout ? (
                        <Layout>
                          <motion.div
                            key={path}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            {element}
                          </motion.div>
                        </Layout>
                      ) : (
                        <motion.div
                          key={path}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {element}
                        </motion.div>
                      )
                    }
                  />
                )}
              />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
