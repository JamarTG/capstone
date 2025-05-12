import React from "react";

interface AuthHeaderProps {
    title: string
}

const AuthHeader: React.FC<AuthHeaderProps> = ({title}) => {
  return (
    <section className="w-full text-center">
      <div className="w-full flex justify-center items-center space-x-4">
        <img
          src={"/logo.png"}
          width={50}
          alt="CSEC IT TUTOR"
        />
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-slate-700">CSEC IT TUTOR</h1>
          <small className="text-gray-600 text-md">Your personalized learning companion</small>
        </div>
      </div>
      <h1 className="mt-5 text-xl text-slate-700">{title}</h1>
    </section>
  );
};

export default AuthHeader;
