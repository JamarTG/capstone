import useRegister from "@/hooks/useRegister";
import type { formTypes } from "@/types";
import InputField from "../../ui/Input";
import RegisterButton from "./RegisterButton";

export default function RegisterForm() {
  const { formData, errors, isPending, handleChange, handleSubmit } = useRegister();

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 w-full sm:max-w-md mx-auto"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputField
          id="firstName"
          name="firstName"
          label="First Name"
          type="text"
          value={formData.firstName}
          onChange={handleChange}
          error={(errors as formTypes.RegisterFormErrors).firstName}
          placeholder="Enter your first name"
        />
        <InputField
          id="lastName"
          name="lastName"
          label="Last Name"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
          error={(errors as formTypes.RegisterFormErrors).lastName}
          placeholder="Enter your last name"
        />
      </div>

      <InputField
        id="email"
        name="email"
        label="Email address"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="Enter your email address"
      />

      <InputField
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="Enter your password"
      />

      <RegisterButton isPending={isPending} />
    </form>
  );
}
