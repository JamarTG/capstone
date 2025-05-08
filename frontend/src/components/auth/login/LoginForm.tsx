import { useLogin } from "../../../hooks/useLogin";
import InputField from "../../ui/Input";
import SignInButton from "./LoginButton";

export default function LoginForm() {
  const { formData, errors, handleChange, handleSubmit, isPending } = useLogin();

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <InputField
        id="email"
        label="Email address"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="Enter your email address"
      />

      <InputField
        id="password"
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="Password"
      />

      <SignInButton isPending={isPending} />
    </form>
  );
}
