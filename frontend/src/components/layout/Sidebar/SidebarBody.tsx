import type { FC, ReactNode } from "react";

interface SidebarContainerProps {
  children: ReactNode;
}

const SidebarBody:FC<SidebarContainerProps> = ({children}) => {
  return (
    <div className="flex flex-col h-full justify-between py-5">{children}</div>
  );
};

export default SidebarBody;
