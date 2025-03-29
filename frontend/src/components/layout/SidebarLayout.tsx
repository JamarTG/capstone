import { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";
import routes from "../../data/routes";
import ConditionalSVG from "../ConditionalSVG";
interface HomeLayoutProps {
  children?: ReactNode;
}

const SidebarLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen relative flex">
      <aside className="h-full w-16 flex flex-col items-center bg-gray-100 border-r border-slate-300 justify-between relative text-gray-600 pb-4">
        <NavLink
          className={"text-4xl"}
          to={"/"}
        >
          {/* <img
            src="/croppedAppLogoIcon.png"
            className="bg-gray-700 w-full"
          /> */}
        </NavLink>

        <div className="flex flex-col space-y-10">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              `h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-300 hover:text-white transition duration-300 ease-linear ${
                isActive ? "bg-gray-300 text-white" : ""
              }`
            }
          >
            <ConditionalSVG
              path={"home"}
              size={30}
            />
          </NavLink>

          <NavLink
            to={"/quiz"}
            className={({ isActive }) =>
              `h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-300 hover:text-white transition duration-300 ease-linear ${
                isActive ? "bg-gray-300 text-white" : ""
              }`
            }
          >
            <ConditionalSVG
              path={"quiz"}
              size={30}
            />
          </NavLink>

          <NavLink
            to={"/archive"}
            className={({ isActive }) =>
              `h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-300 hover:text-white transition duration-300 ease-linear ${
                isActive ? "bg-gray-300 text-white" : ""
              }`
            }
          >
            <ConditionalSVG
              path={"archive"}
              size={30}
            />
          </NavLink>
        </div>

        <div className="flex flex-col space-y-2">
          <NavLink
            to={"/settings"}
            className={({ isActive }) =>
              `h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-300 transition duration-300 ease-linear ${
                isActive ? "bg-gray-300" : ""
              }`
            }
          >
            <svg
              viewBox="0 0 24 24"
              fill="red"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              width="30"
              height="30"
            >
              <g id="icon-settings">
                <path
                  id="Vector"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.86806 5.57297C4.66236 5.45421 4.40042 5.49572 4.25019 5.6797C3.57775 6.50326 3.03397 7.43599 2.64953 8.44724C2.5651 8.66931 2.66012 8.91702 2.86587 9.03581L5 10.2679C6.33334 11.0377 6.33334 12.9622 5 13.732L2.86587 14.9642C2.66012 15.083 2.5651 15.3307 2.64953 15.5528C3.03397 16.564 3.57775 17.4967 4.25019 18.3203C4.40042 18.5043 4.66236 18.5458 4.86806 18.427L6.99997 17.1962C8.33331 16.4264 9.99998 17.3886 9.99998 18.9282V21.3913C9.99998 21.6291 10.1673 21.8353 10.4021 21.873C10.9224 21.9566 11.4561 22 12 22C12.5439 22 13.0776 21.9566 13.5979 21.873C13.8327 21.8353 14 21.6291 14 21.3913V18.9282C14 17.3886 15.6666 16.4263 17 17.1961L19.132 18.4271C19.3377 18.5458 19.5996 18.5043 19.7499 18.3203C20.4223 17.4968 20.9661 16.564 21.3505 15.5528C21.435 15.3307 21.3399 15.083 21.1342 14.9642L19 13.7321C17.6667 12.9622 17.6667 11.0377 19 10.2679L21.1342 9.03578C21.3399 8.91699 21.435 8.66929 21.3505 8.44721C20.9661 7.43596 20.4223 6.50323 19.7499 5.67968C19.5996 5.4957 19.3377 5.45419 19.132 5.57295L17 6.80386C15.6666 7.57366 14 6.61141 14 5.07181V2.60873C14 2.37093 13.8327 2.16467 13.5979 2.12697C13.0776 2.04341 12.5439 2 12 2C11.4561 2 10.9224 2.04342 10.4021 2.12699C10.1673 2.16469 9.99998 2.37095 9.99998 2.60875V5.07178C9.99998 6.61138 8.33331 7.57363 6.99998 6.80383L4.86806 5.57297ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3432 9 9.00002 10.3431 9.00002 12C9.00002 13.6569 10.3432 15 12 15Z"
                  fill="currentColor"
                ></path>
              </g>
            </svg>
          </NavLink>

          <a
            onClick={() => {
              logout();
              navigate(routes.login.path);
            }}
            className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-300 transition duration-300 ease-linear"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
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

      <main className="w-full h-full flex relative overflow-y-auto justify-center items-center bg-gray-100">{children}</main>
    </div>
  );
};

export default SidebarLayout;
