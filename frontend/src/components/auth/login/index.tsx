import RegisterRedirect from "./RegisterRedirect";
import LoginForm from "./LoginForm";
import AuthLayout from "@/components/layout/Auth";

export default function Login() {
  return (
    <AuthLayout>
      <LoginForm />
      <RegisterRedirect />
    </AuthLayout>
  );
}
