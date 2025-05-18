import useSidebarState from "@/hooks/useSidebarExpanded";
import ToggleSidebarButton from "./SidebarToggleButton";
import SidebarOtherRoutes from "./SidebarOtherRoutes";
import SidebarMainRoutes from "./SidebarMainRoutes";
import SidebarSeparator from "./SidebarSeparator";
import type { ReactNode, FC } from "react";
import { Outlet } from "react-router-dom";
import SidebarLogo from "./SidebarLogo";
import { useTheme } from "@/hooks";

interface HomeLayoutProps {
  children?: ReactNode;
}

const SidebarLayout: FC<HomeLayoutProps> = () => {
  const [isExpanded, toggleSidebar] = useSidebarState("sidebarExpanded");
  const { isDark } = useTheme();

  return (
    <div
      className={`min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased ${isDark ? "bg-gray-900 text-gray-100" : "bg-gray-200 text-gray-800"}`}
    >
      <div
        className={`fixed flex flex-col top-0 left-0 border-r ease-in-out h-full ${
          isExpanded ? "w-64" : "w-20"
        } ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
      >
        <div
          className={`flex items-center pointer-img justify-center p-2 ${
            isDark ? "bg-gray-800" : "bg-white"
          } hover:opacity-80 transition-opacity`}
        >
          <SidebarLogo />
        </div>

        <SidebarSeparator />

        <div className="flex flex-col h-full justify-between py-5">
          <SidebarMainRoutes isExpanded={isExpanded} />
          <SidebarOtherRoutes isExpanded={isExpanded} />

          <ToggleSidebarButton
            isExpanded={isExpanded}
            toggleSidebar={toggleSidebar}
          />
        </div>
      </div>

      <main
        className={`flex flex-col flex-grow transition-all duration-300 ease-in-out ${
          isExpanded ? "ml-64" : "ml-20"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default SidebarLayout;
