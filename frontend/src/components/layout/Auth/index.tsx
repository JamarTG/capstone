import RightAuthScreen from "./RightAuthScreen";
import LeftAuthScreen from "./LeftAuthScreen";
import type { ReactNode, FC } from "react";

interface AuthProps {
  children?: ReactNode;
  title: string;
}

const AuthLayout: FC<AuthProps> = ({ children, title }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <LeftAuthScreen title={title}>{children}</LeftAuthScreen>
      <RightAuthScreen />
    </div>
  );
};

export default AuthLayout;
