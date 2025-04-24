import { useContext, useState } from "react";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "../../../utils/api";
import Cookies from "js-cookie";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import AuthLayout from "../../layout/Auth";
import { extractErrorMessage } from "../../../utils/error";
import { AUTH_TOKEN_CONFIG } from "../../../utils/auth";
import { SuccessfulAuthResponse } from "../../../types/auth";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../../../context/AuthContext";
import { User } from "../../../types/context";
import { FORM_CONSTANTS } from "../../../constants";
import { LoginFormErrors, LoginFormFields } from "../../../types/form";
import { loginSchema } from "../../../schemas/loginSchema";
import SignInButton from "./LoginButton";
import InputField from "../../ui/Input";
import RegisterRedirect from "./RegisterRedirect";

export default function Login() {
  const [formData, setFormData] = useState<LoginFormFields>(FORM_CONSTANTS.LOGIN.initialLoginFields);
  const [errors, setErrors] = useState<LoginFormErrors>(FORM_CONSTANTS.LOGIN.initialLoginErrors);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext)!;

  const onSuccess = async ({ token, message }: SuccessfulAuthResponse) => {
    toast.success(message);
    Cookies.set("token", token, AUTH_TOKEN_CONFIG);
    const decodedUser = jwtDecode(token);
    localStorage.setItem("user", JSON.stringify(decodedUser as User));
    setUser(decodedUser as User);
    navigate("/", { replace: true });
  };

  const onError = (error: AxiosError) => {
    toast.error(() => extractErrorMessage(error));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: AuthAPI.login,
    mutationKey: ["login"],
    onSuccess,
    onError,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    const validate = (data: LoginFormFields) => {
      try {
        loginSchema.parse(data);
        setErrors({});
        return true;
      } catch (err) {
        const fieldErrors: { email?: string; password?: string } = {};
        if (err instanceof z.ZodError) {
          err.errors.forEach((error) => {
            if (error.path[0] === "email") fieldErrors.email = error.message;
            if (error.path[0] === "password") fieldErrors.password = error.message;
          });
        }
        setErrors(fieldErrors);
        return false;
      }
    };

    e.preventDefault();
    if (validate(formData)) {
      mutate(formData);
    }
  };

  return (
    <AuthLayout title="Sign in to your account">
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <InputField
          id="email"
          label="Email address"
          type="email"
          name="email" // Ensure name attribute matches the key in formData
          value={formData.email} // Controlled value
          onChange={handleChange} // Correctly passed handler
          error={errors.email}
          placeholder="Enter your email address"
        />

        <InputField
          id="password"
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Password"
        />

        <SignInButton isPending={isPending} />
      </form>

      <RegisterRedirect />
    </AuthLayout>
  );
}
