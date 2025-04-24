import { useContext, useState } from "react";
import * as z from "zod";
import AuthLayout from "../../layout/Auth";
import { useMutation } from "@tanstack/react-query";
import { SuccessfulAuthResponse } from "../../../types/auth";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { extractErrorMessage } from "../../../utils/error";
import { AuthAPI } from "../../../utils/api";
import { AuthContext } from "../../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { User } from "../../../types/context";
import { AUTH_TOKEN_CONFIG } from "../../../utils/auth";
import { FORM_CONSTANTS } from "../../../constants";
import { RegisterFormErrors, RegisterFormFields } from "../../../types/form";
import { registerSchema } from "../../../schemas/registerSchema";
import InputField from "../../ui/Input";
import RegisterButton from "./RegisterButton";
import LoginRedirect from "./LoginRedirect";

export default function Register() {
  const [formData, setFormData] = useState<RegisterFormFields>(FORM_CONSTANTS.REGISTER.initialRegisterFields);
  const [errors, setErrors] = useState<RegisterFormErrors>(FORM_CONSTANTS.REGISTER.initialRegisterErrors);

  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext)!;

  const onSuccess = ({ token, message }: SuccessfulAuthResponse) => {
    toast.success(message);
    Cookies.set("token", token, AUTH_TOKEN_CONFIG);
    const decodedUser = jwtDecode(token);
    localStorage.setItem("user", JSON.stringify(decodedUser as User));
    setUser(decodedUser as User);
    navigate("/", { replace: true });
  };

  const onError = (error: AxiosError) => toast.error(extractErrorMessage(error));

  const { mutate, isPending } = useMutation({
    mutationFn: AuthAPI.register,
    mutationKey: ["register"],
    onSuccess,
    onError,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (data: RegisterFormFields) => {
    try {
      registerSchema.parse(data);
      setErrors({} as RegisterFormFields);
      return true;
    } catch (err) {
      const fieldErrors: {
        firstName?: string;
        lastName?: string;
        email?: string;
        password?: string;
      } = {};
      if (err instanceof z.ZodError) {
        err.errors.forEach((error) => {
          if (error.path[0] === "firstName") fieldErrors.firstName = error.message;
          if (error.path[0] === "lastName") fieldErrors.lastName = error.message;
          if (error.path[0] === "email") fieldErrors.email = error.message;
          if (error.path[0] === "password") fieldErrors.password = error.message;
        });
      }
      setErrors(fieldErrors);
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(formData)) {
      return;
    }
    mutate(formData);
  };

  return (
    <AuthLayout title="Create an Account">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 w-full sm:max-w-md mx-auto"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField
            id="firstName"
            name="firstName"
            label="First Name"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
            placeholder="Enter your first name"
          />
          <InputField
            id="lastName"
            name="lastName"
            label="Last Name"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
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
