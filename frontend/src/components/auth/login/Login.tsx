import { useFormValidation } from "../../../hook/useFormValidation";
import { loginSchema } from "../../../schemas/loginSchema";
import { LoginFormFields} from "../../../types/form";
import { FORM_CONSTANTS } from "../../../constants";
import { useMutation } from "@tanstack/react-query";
import { AuthAPI } from "../../../utils/api";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { SuccessfulAuthResponse } from "../../../types/auth";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import  { JwtPayload } from "jwt-decode";
import { jwtDecode } from "jwt-decode";
import { AUTH_TOKEN_CONFIG } from "../../../utils/auth";
import InputField from "../../ui/Input";
import SignInButton from "./LoginButton";
import RegisterRedirect from "./RegisterRedirect";
import AuthLayout from "../../layout/Auth";
import { useContext } from "react";
import { User } from "../../../types/context";

export default function Login() {
  const { formData, errors, handleChange, validate } = useFormValidation<LoginFormFields>(
    loginSchema,
    FORM_CONSTANTS.LOGIN.initialLoginFields,
    FORM_CONSTANTS.LOGIN.initialLoginErrors
  );

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext)!;

  const onSuccess = async ({ token, message }: SuccessfulAuthResponse) => {
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

  return (
    <AuthLayout title="Sign in to your account">
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          id="email"
          label="Email address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
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
