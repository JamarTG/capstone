import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import routes from "../data/routes";

const useAuthRedirect = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) return;
    navigate(routes.login.path);
  }, [isAuthenticated, navigate]);
};

export default useAuthRedirect;
