import AuthLeftHeader from "./AuthLeftHeader";
import type { ReactNode, FC } from "react";
import AuthLeftBody from "./AuthLeftBody";

interface AuthLeftProps {
  children: ReactNode;
  title: string;
}

const AuthLeft: FC<AuthLeftProps> = ({ title, children }) => {
  return (
    <div className="w-2/3 flex flex-col justify-center items-center px-6 py-12 space-y-10">
      <AuthLeftHeader title={title} />
      <AuthLeftBody children={children} />
    </div>
  );
};

export default AuthLeft;
