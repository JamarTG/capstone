import { useState } from "react";
import * as z from "zod";
import { Link } from "react-router-dom";
import AuthLayout from "../layout/auth";

interface FormFields {
  email: string;
  password: string;
  confirmPassword: string;
}

const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function Register() {
  const [formData, setFormData] = useState<FormFields>({ email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (data: FormFields) => {
    try {
      registerSchema.parse(data);
      setErrors({});
      return true;
    } catch (err) {
      const fieldErrors: { email?: string; password?: string; confirmPassword?: string } = {};
      if (err instanceof z.ZodError) {
        err.errors.forEach((error) => {
          if (error.path[0] === "email") fieldErrors.email = error.message;
          if (error.path[0] === "password") fieldErrors.password = error.message;
          if (error.path[0] === "confirmPassword") fieldErrors.confirmPassword = error.message;
        });
      }
      setErrors(fieldErrors);
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate(formData)) {
      console.log(formData);
    }
  };

  return (
    <AuthLayout title="Create an Account">
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm/6 font-medium text-gray-300"
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
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm/6 font-medium text-gray-300"
          >
            Password
          </label>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm/6 font-medium text-gray-300"
          >
            Confirm Password
          </label>
          <div className="mt-2">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Register
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm/6 text-gray-500">
        Already a member?{" "}
        <Link
          to={"/login"}
          className="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
