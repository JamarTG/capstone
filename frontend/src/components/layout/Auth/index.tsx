import React, { ReactNode } from "react";

interface AuthProps {
  children?: ReactNode;
  title: string;
}

const AuthLayout: React.FC<AuthProps> = ({ children, title }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-12">
        <main className="w-full max-w-md space-y-10">
          <div className="text-center flex flex-col items-start ">
            <div className="w-full flex justify-center items-center">
              <img
                src={"/logo.png"}
                width={50}
                alt="CSEC IT TUTOR"
              />
              <div className="flex flex-col justify-center items-start">
                <h1 className="text-2xl font-bold text-slate-700 ml-2"> CSEC IT TUTOR</h1>
                <small className="text-gray-600 text-md">Your personalized learning companion</small>
              </div>
            </div>

            <h1 className="w-full mt-5 text-xl  text-slate-700">{title}</h1>
          </div>
          {children}
        </main>
      </div>

      <div className="hidden lg:flex w-1/2 items-center justify-center bg-white">
        <div className="flex flex-col items-center text-center px-10">
          <img
            src="/student.jpg"
            alt="Learning"
            className="w-72 h-auto mb-6"
          />
          <h2 className="text-3xl font-semibold text-slate-700">Unlock Your Potential</h2>
          <p className="text-lg text-gray-500 mt-3 max-w-md">
            Learn smarter, grow faster. Our platform helps you prepare with confidence and ease.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
