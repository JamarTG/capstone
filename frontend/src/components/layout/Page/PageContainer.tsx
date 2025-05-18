import { FC, ReactNode } from "react";
import { useTheme } from "@/hooks";

interface PageContainerProps {
  children: ReactNode;
}

const PageContainer: FC<PageContainerProps> = ({ children }) => {
  const { isDark } = useTheme();
  return (
    <div className={`min-h-screen ${isDark ? "bg-gray-800" : "bg-white"}`}>
      {children}
    </div>
  );
};

export default PageContainer;
