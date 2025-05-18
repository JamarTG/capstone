import RenderList from "@/components/common/RenderList";
import type { FC } from "react";
import { mainRoutes } from "./routes";
import { NavLink } from "react-router-dom";
import { capitalize } from "@/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTheme } from "@/hooks";

interface SidebarMainRoutesProps {
    isExpanded: boolean;
}

const SidebarMainRoutes:FC<SidebarMainRoutesProps> = ({isExpanded}) => {

    const {isDark} = useTheme();
    
    return (
    <div className="overflow-y-auto overflow-x-hidden">
      <ul className="flex flex-col gap-2 space-y-2">
        <RenderList
          data={Object.values(mainRoutes)}
          renderFn={({ path, icon, text }) => (
            <li className="sm:text-md" key={text}>
              <NavLink
                to={path}
                title={capitalize(text)}
                className={({ isActive }) =>
                  `flex flex-row items-center h-11 gap-5 focus:outline-none border-l-4 transition-colors duration-200 ${
                    isDark
                      ? `hover:bg-gray-700 text-gray-300 hover:text-white ${
                          isActive
                            ? "border-indigo-500 bg-gray-800 text-white font-medium"
                            : "border-transparent"
                        }`
                      : `hover:bg-gray-200 text-gray-600 hover:text-gray-800 ${
                          isActive
                            ? "border-indigo-500 bg-gray-100 text-gray-800 font-medium"
                            : "border-transparent"
                        }`
                  } ${isExpanded ? "pr-6 pl-3" : "justify-center px-3"}`
                }
              >
                <span className="inline-flex justify-center items-center">
                  <Icon icon={icon!} width={24} height={24} />
                </span>
                {isExpanded && (
                  <span className="ml-1 text-md tracking-wide truncate">
                    {text}
                  </span>
                )}
              </NavLink>
            </li>
          )}
        />
      </ul>
    </div>
  );
};

export default SidebarMainRoutes;
