import { useState } from "react";
import * as z from "zod";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "../../utils/api";
import Button from "../ui/Button";
import Cookies from "js-cookie";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import AuthLayout from "../layout/Auth";
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

  const onSuccess = ({ token, message}: SuccessfulAuthResponse) => {
    toast.success(message);
    Cookies.set("token", token, AUTH_TOKEN_CONFIG);
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
            {errors.email && <p className="text-red-500 text-lg">{errors.email}</p>}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-lg font-medium text-gray-600"
            >
              Password
            </label>
            <div className="text-lg">
              <a
                href="#"
                className="font-semibold text-gray-600 hover:text-gray-800"
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
              className="w-full bg-transparent placeholder:text-gray-400 text-gray-700 text-lg border border-gray-200 rounded-md px-4 py-2 focus:outline-none"
              />
            {errors.password && <p className="text-red-500 text-lg">{errors.password}</p>}
          </div>
        </div>

        <div>
          <Button
            variant="primary"
            type="submit"
            className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-lg/6 font-semibold text-gray-200 shadow-xs"
          >
            {isPending ? "Signing in..." : "Sign in"}
          </Button>
        </div>
      </form>

      <p className="mt-10 text-center text-lg text-gray-500">
        Not a member?{" "}
        <Link
          to={"/register"}
          className="font-semibold hover:text-gray-800 text-gray-600"
        >
          Start your Journey
        </Link>
      </p>
    </AuthLayout>
  );
}
