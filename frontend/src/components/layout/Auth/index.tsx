import AuthScreenRight from "./AuthRight";
import AuthScreenLeft from "./AuthLeft";
import { getTitleFromPath } from "@/utils";
import type { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const title = getTitleFromPath(location.pathname);
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AuthScreenLeft title={title}>{children}</AuthScreenLeft>
      <AuthScreenRight />
    </div>
  );
};

export default AuthLayout;
