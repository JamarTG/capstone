import React, { ReactNode } from "react";

interface AuthProps {
  children?: ReactNode;
  title: string;
}

const AuthLayout: React.FC<AuthProps> = ({ children, title }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className=" w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-12 lg:px-8">
        <div className="w-full flex flex-col justify-center items-center">
          <header className="flex flex-col gap-5 justify-center items-center">
            <h1 className="text-2xl font-bold tracking-tight text-slate-600">{title}</h1>
          </header>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">{children}</div>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2 bg-cover bg-center showcase">
      
      </div>
    </div>
  );
};

export default AuthLayout;
