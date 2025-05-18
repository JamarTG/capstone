
import { useTheme } from "@/hooks";
import type { FC, ReactNode } from "react";

interface SidebarContainerProps {
  children: ReactNode;
  isExpanded: boolean;
}

const SidebarContainer: FC<SidebarContainerProps> = ({
  children,
  isExpanded,
}) => {
  const { isDark } = useTheme();
  return (
    <div
      className={`fixed flex flex-col top-0 left-0 border-r ease-in-out h-full ${
        isExpanded ? "w-64" : "w-20"
      } ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
    >
      {children}
    </div>
  );
};

export default SidebarContainer;
