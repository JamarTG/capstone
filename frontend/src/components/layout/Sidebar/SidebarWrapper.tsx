import { useTheme } from "@/hooks";
import React, { FC } from "react";

interface SidebarWrapperProps {
  children: React.ReactNode;
}

const SidebarWrapper: FC<SidebarWrapperProps> = ({ children }) => {
  const { isDark } = useTheme();
  return (
    <div
      className={`min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased ${isDark ? "bg-gray-900 text-gray-100" : "bg-gray-200 text-gray-800"}`}
    >
      {children}
    </div>
  );
};

export default SidebarWrapper;
