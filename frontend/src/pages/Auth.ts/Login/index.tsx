import AuthLayout from "@/components/layout/Auth";
import RegisterRedirect from "./RegisterRedirect";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <AuthLayout>
      <LoginForm />
      <RegisterRedirect />
    </AuthLayout>
  );
}
