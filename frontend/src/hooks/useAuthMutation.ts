import { useMutation } from "@tanstack/react-query";
import { AuthAPI } from "../utils/api";
import type { SuccessfulAuthResponse } from "../types/auth";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import extractErrorMessage from "../utils/extractErrorMessage";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import type { User } from "../types/context";
import { AUTH_TOKEN_CONFIG } from "../constants";
import { useNavigate } from "react-router-dom";

export const useAuthMutation = () => {
  const { setUser } = useContext(AuthContext)!;
  const navigate = useNavigate();

  const onSuccess = ({ token, message }: SuccessfulAuthResponse) => {
    toast.success(message);
    Cookies.set("token", token, AUTH_TOKEN_CONFIG);
    const decodedUser = jwtDecode(token);
    localStorage.setItem("user", JSON.stringify(decodedUser as User));
    setUser(decodedUser as User);
    navigate("/", { replace: true });
  };

  const onError = (error: AxiosError) => {
    toast.error(extractErrorMessage(error));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: AuthAPI.register,
    mutationKey: ["register"],
    onSuccess,
    onError,
  });

  return { mutate, isPending };
};
