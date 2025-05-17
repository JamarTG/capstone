import { useState } from "react";
import type { ChangeEvent } from "react";
import * as z from "zod";
import type { formTypes } from "@/types";

interface ValidationResult {
  isValid: boolean;
  errors: formTypes.RegisterFormErrors | formTypes.LoginFormErrors;
};

const useFormValidation = <T extends formTypes.RegisterFormFields | formTypes.LoginFormFields>(
  schema: z.ZodSchema<T>,
  initialFields: T,
  initialErrors: formTypes.RegisterFormErrors | formTypes.LoginFormErrors
) => {
  const [formData, setFormData] = useState<T>(initialFields);
  const [errors, setErrors] = useState<formTypes.RegisterFormErrors | formTypes.LoginFormErrors>(initialErrors);

  const validate = (data: T): ValidationResult => {
    try {
      schema.parse(data);
      setErrors({} as formTypes.RegisterFormErrors | formTypes.LoginFormErrors);
      return { isValid: true, errors: {} as formTypes.RegisterFormErrors | formTypes.LoginFormErrors };
    } catch (err) {
      const fieldErrors: Record<string, string> = {};
      if (err instanceof z.ZodError) {
        err.errors.forEach((error) => {
          fieldErrors[error.path[0]] = error.message;
        });
      }
      setErrors(fieldErrors);
      return { isValid: false, errors: fieldErrors };
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return {
    formData,
    errors,
    handleChange,
    validate,
  };
};

export default useFormValidation;