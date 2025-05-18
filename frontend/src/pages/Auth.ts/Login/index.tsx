import AuthLayout from "@/components/layout/Auth";
import LoginForm from "./LoginForm";
import RegisterRedirect from "./RegisterRedirect";

export default function Login() {
  return (
    <AuthLayout>
      <LoginForm />
      <RegisterRedirect />
    </AuthLayout>
  );
}
