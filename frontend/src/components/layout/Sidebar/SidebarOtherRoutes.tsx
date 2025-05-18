import { NavLink, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { AuthContext } from "@/context/AuthContext";
import { useContext, type FC } from "react";
import { otherRoutes } from "./routes";
import { useTheme } from "@/hooks";

interface SidebarOtherRoutesProps {
  isExpanded: boolean;
}

const SidebarOtherRoutes: FC<SidebarOtherRoutesProps> = ({ isExpanded }) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext)!;

  const triggerLogout = () => {
    logout();
    navigate("/login");
  };

  const { isDark } = useTheme();
  return (
    <ul className="flex flex-col space-y-1">
      <li>
        <NavLink
          to={otherRoutes.SETTINGS.path}
          title={otherRoutes.SETTINGS.text}
          className={`flex flex-row items-center h-11 focus:outline-none border-l-4 transition-colors duration-200 ${
            isDark
              ? "hover:bg-gray-700 text-gray-300 hover:text-white border-transparent"
              : "hover:bg-gray-200 text-gray-600 hover:text-gray-800 border-transparent"
          } ${isExpanded ? "pr-6 pl-3" : "justify-center px-3"}`}
        >
          <span className="inline-flex justify-center items-center">
            {otherRoutes.SETTINGS.icon && (
              <Icon icon={otherRoutes.SETTINGS.icon!} width={24} height={24} />
            )}
          </span>
          {isExpanded && (
            <span className="ml-3 text-md tracking-wide truncate">
              {otherRoutes.SETTINGS.text}
            </span>
          )}
        </NavLink>
      </li>

      <li>
        <button
          title={otherRoutes.LOGOUT.text}
          onClick={triggerLogout}
          className={`cursor-pointer flex flex-row items-center h-11 w-full focus:outline-none border-l-4 transition-colors duration-200 ${
            isDark
              ? "hover:bg-gray-700 text-gray-300 hover:text-white border-transparent hover:border-indigo-500"
              : "hover:bg-gray-200 text-gray-600 hover:text-gray-800 border-transparent hover:border-indigo-500"
          } ${isExpanded ? "pr-6 pl-3" : "justify-center px-3"}`}
        >
          <span className="inline-flex justify-center items-center">
            <Icon icon={otherRoutes.LOGOUT.icon!} width={24} height={24} />
          </span>
          {isExpanded && (
            <span className="ml-3 text-md tracking-wide truncate">
              {otherRoutes.LOGOUT.text}
            </span>
          )}
        </button>
      </li>
    </ul>
  );
};

export default SidebarOtherRoutes;
