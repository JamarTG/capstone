import React, { useState } from "react";
import * as z from "zod";
import Button from "../../components/ui/Button";
import { useTheme } from "../../context/ThemeContext";

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  password: z.string().min(6, "New password must be at least 6 characters"),
});

interface ChangePasswordProps {
  user: {
    password: string;
    currentPassword: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  savePassword: () => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({
  user,
  handleChange,
  savePassword,
}) => {
  const [errors, setErrors] = useState<{ currentPassword?: string; password?: string }>({});
   const { isDark } = useTheme();

  const validateAndSave = () => {
    const result = passwordSchema.safeParse(user);

    if (!result.success) {
      const fieldErrors: { currentPassword?: string; password?: string } = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0] as keyof typeof fieldErrors;
        fieldErrors[field] = error.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      savePassword();
    }
  };

  return (
    <div className={`p-6 min-w-90 border rounded-md ${isDark ? "border-gray-700" : "border-gray-200"}`}>
      <h3 className={`text-md mb-3 ${isDark ? "text-gray-100" : "text-slate-600"}`}>Change Password</h3>
      <form>
        <div className="mt-4">
          <label className={`block mt-2 text-md font-medium ${isDark ? "text-gray-200" : "text-slate-600"}`}>Old Password</label>
          <input
            type="password"
            name="currentPassword"
            placeholder="Enter current password"
            value={user.currentPassword}
            onChange={handleChange}
            className={`w-full bg-transparent placeholder:text-slate-400 text-md rounded-md px-4 py-2 focus:outline-none ${
              errors.currentPassword ? "border-red-500" : isDark ? "border-gray-700 text-white" : "border-slate-200 text-slate-700"
            } border`}
          />
          {errors.currentPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
          )}
        </div>
        <div className="mt-4">
          <label className={`block mt-2 text-md font-medium ${isDark ? "text-gray-200" : "text-slate-600"}`}>New Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter new password"
            value={user.password}
            onChange={handleChange}
            className={`w-full bg-transparent placeholder:text-slate-400 text-md rounded-md px-4 py-2 focus:outline-none ${
              errors.password ? "border-red-500" : isDark ? "border-gray-700 text-white" : "border-slate-200 text-slate-700"
            } border`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <Button
          variant="primary"
          type="button"
          className="mt-4 flex gap-2 w-full max-w-16 justify-center rounded-sm bg-gray-600  text-sm/6 text-gray-200 shadow-xs"
          onClick={validateAndSave}
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
