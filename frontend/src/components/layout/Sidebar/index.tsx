import { ReactNode, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import routes, { mainRoutes, otherRoutes, RouteConfig } from "../../../data/routes";
import { AuthContext } from "../../../context/AuthContext";
import { useTheme } from "../../../context/ThemeContext";
import { Icon } from "@mdi/react";
import { MDI_ICONS } from "../../../icons";
import logo from "/logo.png";
import { capitalize } from "../../../utils/text";
import { useSidebarState } from "../../../hooks/useSidebarExpanded";
import RenderList from "../../common/RenderList";

interface HomeLayoutProps {
  children?: ReactNode;
}

const SidebarLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext)!;
  const { isDark } = useTheme();
  const [isExpanded, toggleSidebar] = useSidebarState("sidebarExpanded");

  const goToHome = () => navigate(routes.HOME.path);
  const triggerLogout = () => {
    logout();
    navigate(routes.LOGIN.path);
  };

  return (
    <div
      className={`min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased ${isDark ? "bg-gray-900 text-gray-100" : "bg-gray-200 text-gray-800"}`}
    >
      <div
        className={`fixed flex flex-col top-0 left-0 border-r ease-in-out h-full ${isExpanded ? "w-64" : "w-20"} ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
      >
        <div
          className={`flex items-center pointer-img justify-center p-2 ${isDark ? "bg-gray-800" : "bg-white"} hover:opacity-80 transition-opacity`}
          onClick={goToHome}
        >
          <img
            src={logo}
            width={60}
            alt="Logo"
          />
        </div>
        <div className={`border-b ${isDark ? "border-gray-700" : "border-gray-200"}`} />

        <div className="flex flex-col h-full justify-between py-5">
          <div className="overflow-y-auto overflow-x-hidden">
            <ul className="flex flex-col gap-2 space-y-2">
              <RenderList
                data={Object.values(mainRoutes)}
                renderFn={({ path, icon, text }: RouteConfig) => (
                  <li
                    className="sm:text-md"
                    key={text}
                  >
                    <NavLink
                      to={path}
                      title={capitalize(text)}
                      className={({ isActive }) =>
                        `flex flex-row items-center h-11 gap-5 focus:outline-none border-l-4 transition-colors duration-200 ${
                          isDark
                            ? `hover:bg-gray-700 text-gray-300 hover:text-white ${isActive ? "border-indigo-500 bg-gray-800 text-white font-medium" : "border-transparent"}`
                            : `hover:bg-gray-200 text-gray-600 hover:text-gray-800 ${isActive ? "border-indigo-500 bg-gray-100 text-gray-800 font-medium" : "border-transparent"}`
                        } ${isExpanded ? "pr-6 pl-3" : "justify-center px-3"}`
                      }
                    >
                      <span className="inline-flex justify-center items-center">
                        <Icon
                          path={icon!}
                          size={1}
                        />
                      </span>
                      {isExpanded && <span className="ml-1 text-md tracking-wide truncate">{text}</span>}
                    </NavLink>
                  </li>
                )}
              />
            </ul>
          </div>

          <ul className="flex flex-col space-y-1">
            <li>
                <NavLink
                to={otherRoutes.SETTINGS?.path}
                title={otherRoutes.SETTINGS?.text || "Settings"}
                className={`flex flex-row items-center h-11 focus:outline-none border-l-4 transition-colors duration-200 ${
                  isDark
                  ? `hover:bg-gray-700 text-gray-300 hover:text-white border-transparent`
                  : `hover:bg-gray-200 text-gray-600 hover:text-gray-800 border-transparent`
                } ${isExpanded ? "pr-6 pl-3" : "justify-center px-3"}`}
                >
                <span className="inline-flex justify-center items-center">
                  {
                    otherRoutes.SETTINGS?.icon &&
                      <Icon
                        path={otherRoutes.SETTINGS.icon!}
                        size={1}
                      />
                    

                  }
                 
                </span>
                {isExpanded && <span className="ml-3 text-md tracking-wide truncate">{otherRoutes.SETTINGS?.text || "Settings"}</span>}
                </NavLink>
            </li>

            <li>
              <button
                title={routes.LOGOUT.text}
                onClick={triggerLogout}
                className={`cursor-pointer flex flex-row items-center h-11 w-full focus:outline-none border-l-4 transition-colors duration-200 ${
                  isDark
                    ? "hover:bg-gray-700 text-gray-300 hover:text-white border-transparent hover:border-indigo-500"
                    : "hover:bg-gray-200 text-gray-600 hover:text-gray-800 border-transparent hover:border-indigo-500"
                } ${isExpanded ? "pr-6 pl-3" : "justify-center px-3"}`}
              >
                <span className="inline-flex justify-center items-center">
                  <Icon
                    path={routes.LOGOUT.icon!}
                    size={1}
                  />
                </span>
                {isExpanded && <span className="ml-3 text-md tracking-wide truncate">{routes.LOGOUT.text}</span>}
              </button>
            </li>
          </ul>

          <div className="p-2 flex cursor-pointer">
            <button
              onClick={toggleSidebar}
              className={`w-full flex items-center justify-center rounded-lg transition-colors duration-200 ${
                isDark ? "hover:bg-gray-700" : "hover:bg-gray-300"
              }`}
            >
              <Icon
                path={isExpanded ? MDI_ICONS.chevronDoubleLeft : MDI_ICONS.chevronDoubleRight}
                size={1}
              />
            </button>
          </div>
        </div>
      </div>

      <main className={`flex flex-col flex-grow transition-all duration-300 ease-in-out ${isExpanded ? "ml-64" : "ml-20"}`}>{children}</main>
    </div>
  );
};

export default SidebarLayout;
