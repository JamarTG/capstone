import { useState } from "react";
import * as z from "zod";
import { LoginFormErrors, LoginFormFields, RegisterFormErrors, RegisterFormFields } from "../types/form";

type ValidationResult = {
  isValid: boolean;
  errors: RegisterFormErrors | LoginFormErrors;
};

export function useFormValidation<T extends RegisterFormFields | LoginFormFields>(
  schema: z.ZodSchema<T>,
  initialFields: T,
  initialErrors: RegisterFormErrors | LoginFormErrors
) {
  const [formData, setFormData] = useState<T>(initialFields);
  const [errors, setErrors] = useState<RegisterFormErrors | LoginFormErrors>(initialErrors);

  const validate = (data: T): ValidationResult => {
    try {
      schema.parse(data);
      setErrors({} as any);
      return { isValid: true, errors: {} as any };
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return {
    formData,
    errors,
    handleChange,
    validate,
  };
}
