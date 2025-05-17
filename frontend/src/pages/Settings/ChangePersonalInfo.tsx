import type {
  PersInfoUpdateFieldErrors,
  PersInfoUpdatePayload,
  VoidHandleChangeFn,
} from "./types";
import Button from "../../components/ui/Button";
import { useTheme } from "@/hooks";
import { useState } from "react";
import type { FC } from "react";
import { z } from "zod";

interface ChangePersonalInfoProps {
  persInfoUpdatePayload: PersInfoUpdatePayload;
  handleChange: VoidHandleChangeFn;
  savePersonalInfo: VoidFunction;
}

const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email address"),
});

const ChangePersonalInfo: FC<ChangePersonalInfoProps> = ({
  persInfoUpdatePayload,
  handleChange,
  savePersonalInfo,
}) => {
  const { isDark } = useTheme();
  const [errors, setErrors] = useState<PersInfoUpdateFieldErrors>({});

  const validateAndSave = () => {
    const result = personalInfoSchema.safeParse(persInfoUpdatePayload);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof PersInfoUpdatePayload, string>> =
        {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof PersInfoUpdatePayload;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      savePersonalInfo();
    }
  };

  return (
    <div
      className={`p-6 min-w-90 border rounded-md ${isDark ? "border-gray-700" : "border-gray-200"}`}
    >
      <h3
        className={`text-md  mb-3 ${isDark ? "text-gray-100" : "text-slate-600"}`}
      >
        Personal Information
      </h3>
      <form>
        <div className="grid grid-cols-2 gap-4">
          <>
            <label
              className={`block mt-2 text-md font-medium ${isDark ? "text-gray-200" : "text-slate-600"}`}
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter first name"
              value={persInfoUpdatePayload.firstName}
              onChange={handleChange}
              className={`w-full bg-transparent placeholder:text-slate-400 text-md rounded-md px-4 py-2 focus:outline-none ${
                isDark ? "text-gray-100" : "text-slate-700"
              } border ${errors.firstName ? "border-red-500" : isDark ? "border-gray-700" : "border-slate-200"}`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </>
          <>
            <label
              className={`block mt-2 text-md font-medium ${isDark ? "text-gray-200" : "text-slate-600"}`}
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter last name"
              value={persInfoUpdatePayload.lastName}
              onChange={handleChange}
              className={`w-full bg-transparent placeholder:text-slate-400 text-md rounded-md px-4 py-2 focus:outline-none ${
                isDark ? "text-gray-100" : "text-slate-700"
              } border ${errors.lastName ? "border-red-500" : isDark ? "border-gray-700" : "border-slate-200"}`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </>
        </div>
        <div className="mt-4">
          <label
            className={`block mt-2 text-md font-medium ${isDark ? "text-gray-200" : "text-slate-600"}`}
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter new email"
            value={persInfoUpdatePayload.email}
            onChange={handleChange}
            className={`w-full bg-transparent placeholder:text-slate-400 text-md rounded-md px-4 py-2 focus:outline-none ${
              isDark ? "text-gray-100" : "text-slate-700"
            } border ${errors.email ? "border-red-500" : isDark ? "border-gray-700" : "border-slate-200"}`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        <Button
          variant="primary"
          type="button"
          className="mt-4 flex gap-2 w-full max-w-16 justify-center rounded-sm bg-gray-600 px-2 py-1 text-sm/6  text-gray-200 shadow-xs"
          onClick={validateAndSave}
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default ChangePersonalInfo;
