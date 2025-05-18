import type { ReactNode, FC } from "react";
import AuthHeader from "./AuthHeader";

interface LeftAuthScreenProps {
  children: ReactNode;
  title: string;
}

const LeftAuthScreen: FC<LeftAuthScreenProps> = ({ title, children }) => {
  return (
    <div className="w-2/3 flex flex-col justify-center items-center px-6 py-12 space-y-10">
      <AuthHeader title={title} />
      <div className="w-full flex flex-col justify-center items-center gap-4">
        {children}
      </div>
    </div>
  );
};

export default LeftAuthScreen;
