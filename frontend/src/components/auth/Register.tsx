import { useState } from "react";
import * as z from "zod";
import { Link } from "react-router-dom";
import AuthLayout from "../layout/Auth";
import { useMutation } from "@tanstack/react-query";
import { RegisterFormErrors, RegisterFormFields, SuccessfulAuthResponse } from "../../types/auth";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import routes from "../../data/routes";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { setAuthToken } from "../../utils/auth";
import { extractErrorMessage } from "../../utils/error";
import { AuthAPI } from "../../utils/api";

const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function Register() {
  const initialRegisterFields: RegisterFormFields = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const initialRegisterErrors: RegisterFormErrors = {
    ...initialRegisterFields,
  };

  const [formData, setFormData] = useState<RegisterFormFields>(initialRegisterFields);

  const [errors, setErrors] = useState<RegisterFormFields>(initialRegisterErrors);

  const navigate = useNavigate();

  const onSuccess = ({ token, message }: SuccessfulAuthResponse) => {
    toast.success(message);
    setAuthToken(token);
    navigate(routes.HOME.path);
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
        confirmPassword?: string;
      } = {};
      if (err instanceof z.ZodError) {
        err.errors.forEach((error) => {
          if (error.path[0] === "firstName") fieldErrors.firstName = error.message;
          if (error.path[0] === "lastName") fieldErrors.lastName = error.message;
          if (error.path[0] === "email") fieldErrors.email = error.message;
          if (error.path[0] === "password") fieldErrors.password = error.message;
          if (error.path[0] === "confirmPassword") fieldErrors.confirmPassword = error.message;
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
        className="space-y-6"
      >
        <div>
          <label
            htmlFor="firstName"
            className="block text-lg/6 font-medium text-gray-300"
          >
            First Name
          </label>
          <div className="mt-2">
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-lg/6"
            />
            {errors.firstName && <p className="text-red-500 text-lg">{errors.firstName}</p>}
          </div>
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-lg/6 font-medium text-gray-300"
          >
            Last Name
          </label>
          <div className="mt-2">
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-lg/6"
            />
            {errors.lastName && <p className="text-red-500 text-lg">{errors.lastName}</p>}
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-lg/6 font-medium text-gray-300"
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
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-lg/6"
            />
            {errors.email && <p className="text-red-500 text-lg">{errors.email}</p>}
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-lg/6 font-medium text-gray-300"
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
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-lg/6"
            />
            {errors.password && <p className="text-red-500 text-lg">{errors.password}</p>}
          </div>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-lg/6 font-medium text-gray-300"
          >
            Confirm Password
          </label>
          <div className="mt-2">
            <input
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-lg/6"
            />
            {errors.confirmPassword && <p className="text-red-500 text-lg">{errors.confirmPassword}</p>}
          </div>
        </div>

        <div>
          <Button
            variant="primary"
            type="submit"
            className="flex w-full justify-center rounded-md px-3 py-1.5 text-lg/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isPending ? "Registering..." : "Register"}
          </Button>
        </div>
      </form>

      <p className="mt-10 text-center text-lg/6 text-gray-500">
        Already a member?{" "}
        <Link
          to={"/login"}
          className="font-semibold text-blue-400  hover:text-blue-500"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
