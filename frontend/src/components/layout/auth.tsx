import { ReactNode } from "react";

interface AuthProps {
  children?: ReactNode;
  title: string;
}

const AuthLayout: React.FC<AuthProps> = ({ children, title }) => {
  return (
    <div className="bg-slate-800 w-full lg:w-1/2 flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
      <div className="w-full lg:w-1/2 h-screen flex flex-col justify-center items-center">
        <header className="flex flex-col gap-5 justify-center items-center">
          <img
            src="/croppedAppLogoIcon.png"
            className="w-24"
            alt=""
          />

          <h1 className="mt-[-10px] flex items-end justify-end text-center text-3xl/9 font-bold tracking-tight text-slate-300">{title}</h1>
        </header>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">{children}</div>
      </div>
      <div className="hidden lg:block lg:w-1/2">
      </div>
    </div>
  );
};

export default AuthLayout;
