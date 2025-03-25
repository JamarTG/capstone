import { useState } from "react";
import * as z from "zod";
import { Link } from "react-router-dom";
import AuthLayout from "../layout/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../utils/api";
import { SuccessfulAuthResponse } from "../../types/auth";
import Cookies from "js-cookie";
import Button from "../ui/button";

interface FormFields {
  email: string;
  password: string;
}

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export default function Login() {
  const [formData, setFormData] = useState<FormFields>({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const navigate = useNavigate();

  const handleSuccessfulLoginResponse = ({ token }: SuccessfulAuthResponse) => {   
    Cookies.set("token", token, { path: "/", secure: true });
    navigate("/");
  };
  
  const { mutate } = useMutation({
    mutationFn: loginUser,
    mutationKey: ["login"],
    onSuccess: handleSuccessfulLoginResponse,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (data: FormFields) => {
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

  const handleSubmit = (e: React.FormEvent) => {
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
              {/* <a
                href="#"
                className="font-semibold text-blue-400 hover:text-blue-500"
              >
                Forgot password?
              </a> */}
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
            Sign in
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
