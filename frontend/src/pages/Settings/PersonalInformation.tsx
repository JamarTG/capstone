import React, { useState } from "react";
import * as z from "zod";
import Button from "../../components/ui/Button";
import Icon from "@mdi/react";
import { mdiContentSaveAllOutline } from "@mdi/js";

// Validation schema
const infoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email address"),
});

interface PersonalInformationProps {
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  savePersonalInfo: () => void;
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({
  user,
  handleChange,
  savePersonalInfo,
}) => {
  const [errors, setErrors] = useState<Partial<Record<keyof typeof user, string>>>({});

  const validateAndSave = () => {
    const result = infoSchema.safeParse(user);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof typeof user, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof typeof user;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      savePersonalInfo();
    }
  };

  return (
    <div className="p-6 min-w-90 border border-gray-200">
      <h3 className="text-md text-slate-600 font-semibold mb-3">Personal Information</h3>
      <form>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mt-2 text-md text-slate-600 font-medium">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter first name"
              value={user.firstName}
              onChange={handleChange}
              className={`w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-md border ${
                errors.firstName ? "border-red-500" : "border-slate-200"
              } rounded-md px-4 py-2 focus:outline-none`}
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label className="block mt-2 text-md text-slate-600 font-medium">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter last name"
              value={user.lastName}
              onChange={handleChange}
              className={`w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-md border ${
                errors.lastName ? "border-red-500" : "border-slate-200"
              } rounded-md px-4 py-2 focus:outline-none`}
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>
        </div>
        <div className="mt-4">
          <label className="block mt-2 text-md text-slate-600 font-medium">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter new email"
            value={user.email}
            onChange={handleChange}
            className={`w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-md border ${
              errors.email ? "border-red-500" : "border-slate-200"
            } rounded-md px-4 py-2 focus:outline-none`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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

export default PersonalInformation;
