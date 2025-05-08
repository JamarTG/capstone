import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, error, ...inputProps }) => (
  <React.Fragment>
    <label
      htmlFor={inputProps.id}
      className="block text-lg font-medium text-gray-600"
    >
      {label}
    </label>
    <div className="mt-2">
      <input
        {...inputProps}
        className="w-full bg-transparent placeholder:text-gray-400 text-gray-700 text-lg border border-gray-200 rounded-md px-4 py-2 focus:outline-none"
      />
      {error && <p className="text-red-500 text-lg">{error}</p>}
    </div>
  </React.Fragment>
);

export default InputField;
