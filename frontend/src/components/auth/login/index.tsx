import RegisterRedirect from "./RegisterRedirect";
import AuthLayout from "../../layout/Auth";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <AuthLayout title="Sign in to your account">
      <LoginForm />
      <RegisterRedirect />
    </AuthLayout>
  );
}
