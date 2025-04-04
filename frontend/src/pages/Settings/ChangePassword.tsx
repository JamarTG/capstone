import React, { useState } from "react";
import * as z from "zod";
import Button from "../../components/ui/Button";
import Icon from "@mdi/react";
import { mdiContentSaveAllOutline } from "@mdi/js";

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
    <div className="p-6 min-w-90 border border-gray-200">
      <h3 className="text-md text-slate-600 font-semibold mb-3">Change Password</h3>
      <form>
        <div className="mt-4">
          <label className="block mt-2 text-md text-slate-600 font-medium">Old Password</label>
          <input
            type="password"
            name="currentPassword"
            placeholder="Enter current password"
            value={user.currentPassword}
            onChange={handleChange}
            className={`w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-md border ${
              errors.currentPassword ? "border-red-500" : "border-slate-200"
            } rounded-md px-4 py-2 focus:outline-none`}
          />
          {errors.currentPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>
          )}
        </div>
        <div className="mt-4">
          <label className="block mt-2 text-md text-slate-600 font-medium">New Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter new password"
            value={user.password}
            onChange={handleChange}
            className={`w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-md border ${
              errors.password ? "border-red-500" : "border-slate-200"
            } rounded-md px-4 py-2 focus:outline-none`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <Button
          variant="primary"
          type="button"
          className="mt-4 flex gap-2 w-full max-w-32 justify-center rounded-sm bg-gray-600 px-2 py-1 text-md/6 font-semibold text-gray-200 shadow-xs"
          onClick={validateAndSave}
        >
          <Icon path={mdiContentSaveAllOutline} size={1} />
          Save
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
