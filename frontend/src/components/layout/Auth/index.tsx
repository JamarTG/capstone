import React, { ReactNode } from "react";
import RightAuthScreen from "./RightAuthScreen";
import LeftAuthScreen from "./LeftAuthScreen";

interface AuthProps {
  children?: ReactNode;
  title: string;
}

const AuthLayout: React.FC<AuthProps> = ({ children, title }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <LeftAuthScreen title={title}>
        {children}
      </LeftAuthScreen>
      <RightAuthScreen />
    </div>
  );
};

export default AuthLayout;
