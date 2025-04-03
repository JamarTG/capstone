import React from "react";
import Button from "../../components/ui/Button";
import Icon from "@mdi/react";
import { mdiContentSaveAllOutline } from "@mdi/js";

interface ChangePasswordProps {
  user: {
    password: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  savePassword: () => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ user, handleChange, savePassword }) => {
  return (
    <div className="p-6 min-w-90 border border-gray-200">
      <h3 className="text-md text-slate-600 font-semibold mb-3">Change Password</h3>
      <form>
        <div className="mt-4">
          <label className="block mt-2 text-md text-slate-600 font-medium">Old Password</label>
          <input
            type="password"
            name="oldPassword"
            placeholder="Enter old password"
            value={user.password}
            onChange={handleChange}
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-md border border-slate-200 rounded-md px-4 py-2 focus:outline-none"
          />
        </div>
        <div className="mt-4">
          <label className="block mt-2 text-md text-slate-600 font-medium">New Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter new password"
            value={user.password}
            onChange={handleChange}
            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-md border border-slate-200 rounded-md px-4 py-2 focus:outline-none"
          />
        </div>

        <Button
          variant="primary"
          type="button"
          className="mt-4 flex gap-2 w-full max-w-32 justify-center rounded-sm bg-gray-600 px-2 py-1 text-md/6 font-semibold text-gray-200 shadow-xs"
          onClick={savePassword}
        >
          <Icon
            path={mdiContentSaveAllOutline}
            size={1}
          />
          Save
        </Button>
      </form>
    </div>
  );
};

export default ChangePassword;
