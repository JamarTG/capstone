import AuthLayout from "@/components/layout/Auth";
import LoginRedirect from "./LoginRedirect";
import RegisterForm from "./RegisterForm";

export default function Register() {
  return (
    <AuthLayout>
      <RegisterForm />
      <LoginRedirect />
    </AuthLayout>
  );
}
