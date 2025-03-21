import { ReactNode } from "react";

interface AuthProps {
  children?: ReactNode;
  title: string;
}

const AuthLayout: React.FC<AuthProps> = ({ children, title }) => {
  return (
    <div className="bg-slate-800 w-1/2 flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
      <div className="w-1/2 h-screen flex flex-col justify-center items-center">
        <img
          src="/appLogoIcon.png"
          className="w-16"
          alt=""
        />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">{title}</h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">{children}</div>
      </div>
      <div className="w-1/2"></div>
    </div>
  );
};

export default AuthLayout;
