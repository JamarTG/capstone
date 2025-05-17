import { AuthContext } from "../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import useFormValidation from "./useFormValidation";
import { AUTH_TOKEN_CONFIG } from "../constants";
import { useNavigate } from "react-router-dom";
import { FORM_CONSTANTS } from "../constants";
import type { authTypes } from "@/types";
import { toast } from "react-hot-toast";
import { JwtPayload } from "jwt-decode";
import type { apiTypes } from "@/types";
import type { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import type { FormEvent } from "react";
import { formTypes } from "@/types";
import { useContext } from "react";
import Cookies from "js-cookie";
import { AuthAPI } from "@/api";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function useLogin() {
  const { formData, errors, handleChange, validate } =
    useFormValidation<formTypes.LoginFormFields>(
      loginSchema,
      FORM_CONSTANTS.LOGIN.initialLoginFields,
      FORM_CONSTANTS.LOGIN.initialLoginErrors,
    );

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext)!;

  const onSuccess = ({ token, message }: apiTypes.APISuccessResponse) => {
    toast.success(message);
    Cookies.set("token", token, AUTH_TOKEN_CONFIG);
    const decodedUser = jwtDecode<JwtPayload & authTypes.AuthUser>(token);
    localStorage.setItem("user", JSON.stringify(decodedUser));
    setUser(decodedUser);
    navigate("/", { replace: true });
  };

  const onError = (error: AxiosError) => {
    const errorMessage =
      (error.response?.data as { message?: string })?.message ||
      "Login failed!";
    toast.error(errorMessage);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: AuthAPI.login,
    mutationKey: ["login"],
    onSuccess,
    onError,
  });

  const handleSubmit = (e: FormEvent) => {
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
