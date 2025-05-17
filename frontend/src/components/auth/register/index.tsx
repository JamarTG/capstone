import LoginRedirect from "./LoginRedirect";
import AuthLayout from "../../layout/Auth";
import RegisterForm from "./RegisterForm";

export default function Register() {
  return (
    <AuthLayout title="Create an Account">
      <RegisterForm />
      <LoginRedirect />
    </AuthLayout>
  );
}
