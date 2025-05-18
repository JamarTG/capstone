import { FC, ReactNode } from "react";

interface AuthLeftBodyProps {
  children: ReactNode;
}

const AuthLeftBody: FC<AuthLeftBodyProps> = ({ children }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      {children}
    </div>
  );
};

export default AuthLeftBody;
