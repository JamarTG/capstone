import { useContext } from "react";
import { AuthContext } from "../context/auth";

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth Hook must be used in an Auth Provider");
  }

  return context;
};

export default useAuth;
