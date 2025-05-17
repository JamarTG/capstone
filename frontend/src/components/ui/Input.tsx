import type { LoginFormErrors, RegisterFormErrors } from "../../types/form";
import type { FC, InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  error?:
    | LoginFormErrors[keyof LoginFormErrors]
    | RegisterFormErrors[keyof RegisterFormErrors];
  label: string;
}

const InputField: FC<InputFieldProps> = ({ label, error, ...inputProps }) => (
  <>
    <label
      htmlFor={inputProps.id}
      className="block text-lg font-medium text-gray-600"
    >
      {label}
    </label>
    <div className="mt-2">
      <input
        {...inputProps}
        className="w-86 bg-transparent placeholder:text-gray-400 text-gray-700 text-lg border border-gray-200 rounded-md px-5 py-3 focus:outline-none"
      />
      {error && <p className="text-red-500 text-lg">{error}</p>}
    </div>
  </>
);

export default InputField;
