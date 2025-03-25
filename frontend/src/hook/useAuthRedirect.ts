import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const useAuthRedirect = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(isAuthenticated)
    if (isAuthenticated) return;
    console.log(isAuthenticated)
   
    navigate("/login");
  },[isAuthenticated,navigate]);
};

export default useAuthRedirect;
