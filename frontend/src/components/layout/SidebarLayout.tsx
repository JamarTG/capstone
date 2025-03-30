import { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";
import routes from "../../data/routes";
import ConditionalSVG from "../ConditionalSVG";
import RenderList from "../common/RenderList";
import { MainNavItem } from "../../types/routes";
import { MAIN_NAV_ITEMS } from "../../constants/routes";

interface HomeLayoutProps {
  children?: ReactNode;
}


const renderNavLinks = ({ path, name } : MainNavItem)  => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-300 hover:text-white transition duration-300 ease-linear ${
          isActive ? "bg-gray-300 text-white" : ""
        }`
      }
    >
      <ConditionalSVG
        path={name}
        size={30}
      />
    </NavLink>
  );
};

const SidebarLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen relative flex">
      <aside className="h-full w-16 flex flex-col items-center bg-gray-100 border-r border-slate-300 justify-between relative text-gray-600 pb-4">
        <NavLink
          className={"text-4xl"}
          to={"/"}
        ></NavLink>

        <div className="flex flex-col space-y-10">
          <RenderList
            data={MAIN_NAV_ITEMS}
            renderFn={renderNavLinks}
          />
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
            <ConditionalSVG
              path={"settings"}
              size={30}
            />
          </NavLink>

          <a
            onClick={() => {
              logout();
              navigate(routes.LOGIN.path);
            }}
            className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-300 transition duration-300 ease-linear"
          ></a>
        </div>
      </aside>

      <main className="w-full h-full flex relative overflow-y-auto justify-center items-center bg-gray-100">{children}</main>
    </div>
  );
};

export default SidebarLayout;
