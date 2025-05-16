import type { FC, ReactNode } from "react";
import { useTheme } from "../../../hooks/useTheme";

interface MainContentProps {
  children: ReactNode;
}

const MainContent: FC<MainContentProps> = ({ children }) => {
  const { isDark } = useTheme();

  return (
    <main className={`flex flex-col gap-2 p-4 rounded-lg ${isDark ? "bg-gray-800 text-white" : "bg-white text-slate-700"}`}>
      {children}
    </main>
  );
};

export default MainContent;
