import { useFormValidation } from "../../../hook/useFormValidation";
import { registerSchema } from "../../../schemas/registerSchema";
import { RegisterFormFields } from "../../../types/form";
import { FORM_CONSTANTS } from "../../../constants";
import { useMutation } from "@tanstack/react-query";
import { AuthAPI } from "../../../utils/api";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { SuccessfulAuthResponse } from "../../../types/auth";
import { AuthContext } from "../../../context/AuthContext";
import { toast } from "react-hot-toast";
import Cookies from "js-cookie";
import  { jwtDecode, JwtPayload } from "jwt-decode";
import { AUTH_TOKEN_CONFIG } from "../../../utils/auth";
import InputField from "../../ui/Input";
import RegisterButton from "./RegisterButton";
import LoginRedirect from "./LoginRedirect";
import AuthLayout from "../../layout/Auth";
import { useContext } from "react";
import { User } from "../../../types/context";

export default function Register() {
  const { formData, errors, handleChange, validate } = useFormValidation<RegisterFormFields>(
    registerSchema,
    FORM_CONSTANTS.REGISTER.initialRegisterFields,
    FORM_CONSTANTS.REGISTER.initialRegisterErrors
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
    const errorMessage = (error.response?.data as { message?: string })?.message || "Registration failed!";
    toast.error(errorMessage);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: AuthAPI.register,
    mutationKey: ["register"],
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
    <AuthLayout title="Create an Account">
      <form onSubmit={handleSubmit} className="space-y-4 w-full sm:max-w-md mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            id="firstName"
            name="firstName"
            label="First Name"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            error={(errors as RegisterFormFields).firstName as string}
            placeholder="Enter your first name"
          />
          <InputField
            id="lastName"
            name="lastName"
            label="Last Name"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            error={((errors as RegisterFormFields).lastName)}
            placeholder="Enter your last name"
          />
        </div>

        <InputField
          id="email"
          name="email"
          label="Email address"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="Enter your email address"
        />

        <InputField
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="Enter your password"
        />

        <RegisterButton isPending={isPending} />
      </form>

      <LoginRedirect />
    </AuthLayout>
  );
}
