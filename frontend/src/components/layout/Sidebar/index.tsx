import { ReactNode, useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import routes from "../../../data/routes";
import RenderList from "../../common/RenderList";
import { MainNavItem } from "../../../types/routes";
import { MAIN_NAV_ITEMS } from "../../../constants/routes";
import { AuthContext } from "../../../context/AuthContext";
import IconRenderer from "../../NavIconRenderer";

interface HomeLayoutProps {
  children?: ReactNode;
}

const navTexts: Record<string, string> = {
  home: "Dashboard",
  quiz: "Quizzes",
  archive: "Archive",
  profile: "Profile",
  settings: "Settings",
  logout: "Logout",
};

const renderNavLinks = ({ path, name }: MainNavItem, isExpanded: boolean) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex flex-row items-center h-11 gap-5 focus:outline-none hover:bg-gray-200 text-gray-600 hover:text-gray-800 border-l-4 transition-colors duration-200 ${
          isActive ? "border-indigo-500 bg-gray-100 text-gray-800 font-medium" : "border-transparent hover:border-indigo-500"
        } ${isExpanded ? "pr-6 pl-3" : "justify-center px-3"}`
      }
    >
      <span className="inline-flex justify-center items-center">
        <IconRenderer icon={name.toString()} />
      </span>
      {isExpanded && <span className="ml-1 text-md tracking-wide truncate">{navTexts[name] || name}</span>}
    </NavLink>
  );
};

const SidebarLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext)!;
  const [isExpanded, setIsExpanded] = useState(() => {
    const saved = localStorage.getItem("sidebarExpanded");
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem("sidebarExpanded", JSON.stringify(isExpanded));
  }, [isExpanded]);

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-200 text-gray-800">
      <div
        className={`fixed flex flex-col top-0 left-0 bg-white h-full border-r border-gray-200 transition-all duration-300 ease-in-out h-full ${
          isExpanded ? "w-64" : "w-20"
        }`}
      >
        <div className="flex items-center justify-center p-2">
            {/* {isExpanded ? <div className="text-xl">Quiz App</div> : <div className="text-2xl">Q</div>} */}
          </div>
        <div className="flex flex-col h-full justify-between py-5">
          

          <div className="overflow-y-auto overflow-x-hidden">
            <ul className="flex flex-col gap-2 space-y-2">
              {/* {isExpanded && (
                <li className="px-5">
                  <div className="flex flex-row items-center h-8">
                    <div className="text-sm font-light tracking-wide text-gray-500">Menu</div>
                  </div>
                </li>
              )} */}

              <RenderList
                data={MAIN_NAV_ITEMS}
                renderFn={(item) => (
                  <li
                    className="sm:text-md"
                    key={item.name}
                  >
                    {renderNavLinks(item, isExpanded)}
                  </li>
                )}
              />
            </ul>
          </div>

         
            <ul className="flex flex-col space-y-1">
              {/* {isExpanded && (
                <li className="px-5">
                  <div className="flex flex-row items-center h-8">
                    <div className="text-sm font-light tracking-wide text-gray-500">Account</div>
                  </div>
                </li>
              )} */}

              <li>
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    `flex flex-row items-center h-11 focus:outline-none hover:bg-gray-200 text-gray-600 hover:text-gray-800 border-l-4 transition-colors duration-200 ${
                      isActive ? "border-indigo-500 bg-gray-200 text-gray-800 font-medium" : "border-transparent hover:border-indigo-500"
                    } ${isExpanded ? "pr-6 pl-3" : "justify-center px-3"}`
                  }
                >
                  <span className="inline-flex justify-center items-center">
                    <IconRenderer icon="settings" />
                  </span>
                  {isExpanded && <span className="ml-3 text-md tracking-wide truncate">Settings</span>}
                </NavLink>
              </li>

              <li>
                <button
                  onClick={() => {
                    logout();
                    navigate(routes.LOGIN.path);
                  }}
                  className={`cursor-pointer flex flex-row items-center h-11 w-full focus:outline-none hover:bg-gray-200 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 transition-colors duration-200 ${
                    isExpanded ? "pr-6 pl-3" : "justify-center px-3"
                  }`}
                >
                  <span className="inline-flex justify-center items-center">
                    <IconRenderer icon="logout" />
                  </span>
                  {isExpanded && <span className="ml-3 text-md tracking-wide truncate">Logout</span>}
                </button>
              </li>
            </ul>

            <div className="p-2 flex cursor-pointer">
              <button
                onClick={toggleSidebar}
                className="w-full flex items-center justify-center rounded-lg transition-colors duration-200"
              >
                <svg
                  className={`w-5 text-gray-500 transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
      
      </div>

  
      <div className={`flex flex-col flex-grow transition-all duration-300 ease-in-out ${isExpanded ? "ml-64" : "ml-20"}`}>{children}</div>
    </div>
  );
};

export default SidebarLayout;
