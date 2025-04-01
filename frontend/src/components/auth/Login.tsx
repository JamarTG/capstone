import { useState } from "react";
import * as z from "zod";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "../../utils/api";
import Button from "../ui/UIButton";
import Cookies from "js-cookie";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import AuthLayout from "../layout/AuthLayout";
import { extractErrorMessage } from "../../utils/error";
import { AUTH_TOKEN_CONFIG } from "../../utils/auth";
import { LoginFormErrors, LoginFormFields, SuccessfulAuthResponse } from "../../types/auth";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function Login() {
  const initialLoginFields: LoginFormFields = { email: "", password: "" };
  const initialLoginErrors: LoginFormErrors = { ...initialLoginFields };

  const [formData, setFormData] = useState<LoginFormFields>(initialLoginFields);
  const [errors, setErrors] = useState<LoginFormErrors>(initialLoginErrors);

  const navigate = useNavigate();

  const onSuccess = ({ token, message }: SuccessfulAuthResponse) => {
    toast.success(message);
    Cookies.set("token", token, AUTH_TOKEN_CONFIG);
    navigate("/");
  };

  const onError = (error: AxiosError) => {
    console.log("error", error);
    toast.error(() => extractErrorMessage(error));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: AuthAPI.login,
    mutationKey: ["login"],
    onSuccess,
    onError,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
        <div>
          <label
            htmlFor="email"
            className="block text-lg/6 font-medium text-gray-200"
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
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-lg/6 font-medium text-gray-300"
            >
              Password
            </label>
            <div className="text-lg">
              <a
                href="#"
                className="font-semibold text-blue-400 hover:text-blue-500"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-lg/6"
            />
            {errors.password && <p className="text-red-500 text-lg">{errors.password}</p>}
          </div>
        </div>

        <div>
          <Button
            variant="primary"
            type="submit"
            className="flex w-full justify-center rounded-md px-3 py-1.5 text-lg/6 font-semibold text-white shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {isPending ? "Signing in..." : "Sign in"}
          </Button>
        </div>
      </form>

      <p className="mt-10 text-center text-lg/6 text-gray-200">
        Not a member?{" "}
        <Link
          to={"/register"}
          className="font-semibold text-blue-400  hover:text-blue-500"
        >
          Start your Journey
        </Link>
      </p>
    </AuthLayout>
  );
}
