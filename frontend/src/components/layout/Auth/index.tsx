import RightAuthScreen from "./RightAuthScreen";
import LeftAuthScreen from "./LeftAuthScreen";
import type { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const title =
    location.pathname === "/login"
      ? "Sign into your account"
      : location.pathname === "/register"
        ? "Create an account"
        : "";

  return (
    <div className="flex min-h-screen bg-gray-100">
      <LeftAuthScreen title={title}>{children}</LeftAuthScreen>
      <RightAuthScreen />
    </div>
  );
};

export default AuthLayout;
