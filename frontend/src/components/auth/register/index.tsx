import AuthLayout from "../../layout/Auth";
import RegisterForm from "./RegisterForm";
import LoginRedirect from "./LoginRedirect";

export default function Register() {
  return (
    <AuthLayout title="Create an Account">
      <RegisterForm />
      <LoginRedirect />
    </AuthLayout>
  );
}
