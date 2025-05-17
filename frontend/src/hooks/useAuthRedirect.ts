import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "./useAuth";
import routes from "../routes";

const useAuthRedirect = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) return;

    navigate(routes.LOGIN.path);
  }, [isAuthenticated, navigate]);
};

export default useAuthRedirect;
