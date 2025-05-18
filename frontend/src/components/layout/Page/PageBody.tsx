import type { FC, ReactNode } from "react";
import { useTheme } from "@/hooks";

interface PageBodyProps {
  children: ReactNode;
}

const PageBody: FC<PageBodyProps> = ({ children }) => {
  const { isDark } = useTheme();

  return (
    <main
      className={`flex flex-col gap-2 p-4 rounded-lg ${isDark ? "bg-gray-800 text-white" : "bg-white text-slate-700"}`}
    >
      {children}
    </main>
  );
};

export default PageBody;
