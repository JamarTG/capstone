import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";
import { useFormValidation } from "./useFormValidation";
import { loginSchema } from "../schemas/loginSchema";
import { FORM_CONSTANTS } from "../constants";
import { AuthAPI } from "../utils/api";
import { AxiosError } from "axios";
import { AuthContext } from "../context/AuthContext";
import { SuccessfulAuthResponse } from "../types/auth";
import { JwtPayload } from "jwt-decode";
import { User } from "../types/context";
import { LoginFormFields } from "../types/form";
import { AUTH_TOKEN_CONFIG } from "../utils/auth";

export function useLogin() {
  const { formData, errors, handleChange, validate } = useFormValidation<LoginFormFields>(
    loginSchema,
    FORM_CONSTANTS.LOGIN.initialLoginFields,
    FORM_CONSTANTS.LOGIN.initialLoginErrors
  );

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext)!;

  const onSuccess = ({ token, message }: SuccessfulAuthResponse) => {
    toast.success(message);
    Cookies.set("token", token, AUTH_TOKEN_CONFIG);
    const decodedUser = jwtDecode<JwtPayload & User>(token);
    localStorage.setItem("user", JSON.stringify(decodedUser));
    setUser(decodedUser);
    navigate("/", { replace: true });
  };

  const onError = (error: AxiosError) => {
    const errorMessage = (error.response?.data as { message?: string })?.message || "Login failed!";
    toast.error(errorMessage);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: AuthAPI.login,
    mutationKey: ["login"],
    onSuccess,
    onError,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { isValid } = validate(formData);
    if (isValid) {
      mutate(formData);
    }
  };

  return {
    formData,
    errors,
    handleChange,
    handleSubmit,
    isPending,
  };
}
