import AuthLayout from "../../layout/Auth";
import LoginForm from "./LoginForm";
import RegisterRedirect from "./RegisterRedirect";

export default function Login() {
  return (
    <AuthLayout title="Sign in to your account">
      <LoginForm />
      <RegisterRedirect />
    </AuthLayout>
  );
}
