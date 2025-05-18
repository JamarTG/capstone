import { Outlet } from "react-router-dom";
import type { FC } from "react";

interface SidebarContentProps {
  isExpanded: boolean;
}

const SidebarContent: FC<SidebarContentProps> = ({ isExpanded }) => {
  return (
    <main
      className={`flex flex-col flex-grow transition-all duration-300 ease-in-out ${
        isExpanded ? "ml-64" : "ml-20"
      }`}
    >
      <Outlet />
    </main>
  );
};

export default SidebarContent;
