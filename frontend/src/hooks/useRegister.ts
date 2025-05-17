import useFormValidation from "./useFormValidation";
import { FORM_CONSTANTS } from "../constants";
import { useMutation } from "@tanstack/react-query";
import { AuthAPI } from "@/api";
import { toast } from "react-hot-toast";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { AUTH_TOKEN_CONFIG } from "../constants";
import type { FormEvent } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import type { authTypes } from "@/types";
import type { apiTypes } from "@/types";
import { z } from "zod";
import type { formTypes } from "@/types";

export const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email(),
  password: z.string().min(6),
});

const useRegister = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext)!;

  const { formData, errors, handleChange, validate } = useFormValidation<formTypes.RegisterFormFields>(
    registerSchema,
    FORM_CONSTANTS.REGISTER.initialRegisterFields,
    FORM_CONSTANTS.REGISTER.initialRegisterErrors
  );

  const onSuccess = ({ token, message }: apiTypes.APISuccessResponse) => {
    toast.success(message);
    Cookies.set("token", token, AUTH_TOKEN_CONFIG);
    const decodedUser = jwtDecode<JwtPayload & authTypes.AuthUser>(token);
    localStorage.setItem("user", JSON.stringify(decodedUser));
    setUser(decodedUser);
    navigate("/", { replace: true });
  };

  const onError = (error: AxiosError) => {
    const errorMessage = (error.response?.data as { message?: string })?.message || "Registration failed!";
    toast.error(errorMessage);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: AuthAPI.register,
    mutationKey: ["register"],
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
    isPending,
    handleChange,
    handleSubmit,
  };
};

export default useRegister;
