import { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";
import routes from "../../data/routes";
interface HomeLayoutProps {
  children?: ReactNode;
}

const SidebarLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen relative flex">
      <aside className="h-full w-16 flex flex-col items-center justify-between relative bg-gray-800 text-gray-400 py-4">
        <NavLink to={"/"}>
          <img
            src="/croppedAppLogoIcon.png"
            className="w-16"
          />
        </NavLink>

        <div className="flex flex-col space-y-10">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-700 hover:text-white transition duration-300 ease-linear ${
                isActive ? "bg-gray-700 text-white" : ""
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-book-open"
            >
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
          </NavLink>

          <NavLink
            to={"/quiz"}
            className={({ isActive }) =>
              `h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-700 hover:text-white transition duration-300 ease-linear ${
                isActive ? "bg-gray-700 text-white" : ""
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-edit"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </NavLink>

          <NavLink
            to={"/quiz-history"}
            className={({ isActive }) =>
              `h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-700 hover:text-white transition duration-300 ease-linear ${
                isActive ? "bg-gray-700 text-white" : ""
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-clock"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
              ></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </NavLink>
        </div>

        <div className="flex flex-col space-y-2">
          <NavLink
            to={"/settings"}
            className={({ isActive }) =>
              `h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-700 hover:text-white transition duration-300 ease-linear ${
                isActive ? "bg-gray-700 text-white" : ""
              }`
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </NavLink>

          <a
            onClick={() => {
              logout();
              navigate(routes.login.path);
            }}
            className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-700 hover:text-white transition duration-300 ease-linear"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-log-out"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line
                x1="21"
                y1="12"
                x2="9"
                y2="12"
              ></line>
            </svg>
          </a>
        </div>
      </aside>

      <main className="w-full h-full flex relative overflow-y-auto justify-center items-center">{children}</main>
    </div>
  );
};

export default SidebarLayout;
