import type { FC, ReactNode } from "react";
import { useTheme } from "@/hooks";

interface SidebarHeaderProps {
  children: ReactNode;
}

const SidebarHeader: FC<SidebarHeaderProps> = ({ children }) => {
  const { isDark } = useTheme();

  return (
    <div
      className={`flex items-center pointer-img justify-center p-2 ${
        isDark ? "bg-gray-800" : "bg-white"
      } hover:opacity-80 transition-opacity`}
    >
      {children}
    </div>
  );
};

export default SidebarHeader;
