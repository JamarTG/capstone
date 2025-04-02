import { useContext, useState } from "react";
import * as z from "zod";
import { Link } from "react-router-dom";
import AuthLayout from "../layout/Auth";
import { useMutation } from "@tanstack/react-query";
import { RegisterFormErrors, RegisterFormFields, SuccessfulAuthResponse } from "../../types/auth";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

import { extractErrorMessage } from "../../utils/error";
import { AuthAPI } from "../../utils/api";
import { AuthContext } from "../../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import { User } from "../../types/context";
import { AUTH_TOKEN_CONFIG } from "../../utils/auth";

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email(),
  password: z.string().min(6),
});

export default function Register() {
  const initialRegisterFields: RegisterFormFields = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const initialRegisterErrors: RegisterFormErrors = {
    ...initialRegisterFields,
  };

  const [formData, setFormData] = useState<RegisterFormFields>(initialRegisterFields);

  const [errors, setErrors] = useState<RegisterFormFields>(initialRegisterErrors);

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
          <div>
            <label
              htmlFor="firstName"
              className="block text-lg font-medium text-gray-600"
            >
              First Name
            </label>
            <div className="mt-2">
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full bg-transparent placeholder:text-gray-400 text-gray-700 text-lg border border-gray-200 rounded-md px-4 py-2 focus:outline-none"
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            </div>
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-lg font-medium text-gray-600"
            >
              Last Name
            </label>
            <div className="mt-2">
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full bg-transparent placeholder:text-gray-400 text-gray-700 text-lg border border-gray-200 rounded-md px-4 py-2 focus:outline-none"
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-600"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="w-full bg-transparent placeholder:text-gray-400 text-gray-700 text-lg border border-gray-200 rounded-md px-4 py-2 focus:outline-none"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-lg font-medium text-gray-600"
          >
            Password
          </label>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
              className="w-full bg-transparent placeholder:text-gray-400 text-gray-700 text-lg border border-gray-200 rounded-md px-4 py-2 focus:outline-none"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
        </div>

        <div>
          <Button
            variant="primary"
            type="submit"
            className="flex w-full justify-center rounded-md px-3 py-1.5 text-lg font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isPending ? "Registering..." : "Register"}
          </Button>
        </div>
      </form>

      <p className="mt-10 text-center text-lg text-gray-500">
        Already a member?{" "}
        <Link
          to={"/login"}
          className="font-semibold hover:text-gray-800 text-gray-600"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
