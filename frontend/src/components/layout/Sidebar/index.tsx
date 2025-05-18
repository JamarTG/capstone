import useSidebarState from "@/hooks/useSidebarExpanded";
import ToggleSidebarButton from "./SidebarToggleButton";
import SidebarOtherRoutes from "./SidebarOtherRoutes";
import SidebarMainRoutes from "./SidebarMainRoutes";
import SidebarSeparator from "./SidebarSeparator";
import SidebarContainer from "./SidebarContainer";
import SidebarContent from "./SidebarContent";
import SidebarHeader from "./SidebarHeader";
import type { ReactNode, FC } from "react";
import SidebarBody from "./SidebarBody";
import SidebarLogo from "./SidebarLogo";

interface HomeLayoutProps {
  children?: ReactNode;
}

const SidebarLayout: FC<HomeLayoutProps> = () => {
  const [isExpanded, toggleSidebar] = useSidebarState("sidebarExpanded");

  return (
    <>
      <SidebarContainer isExpanded={isExpanded}>
        <SidebarHeader>
          <SidebarLogo />
        </SidebarHeader>

        <SidebarSeparator />

        <SidebarBody>
          <SidebarMainRoutes isExpanded={isExpanded} />
          <SidebarOtherRoutes isExpanded={isExpanded} />

          <ToggleSidebarButton
            isExpanded={isExpanded}
            toggleSidebar={toggleSidebar}
          />
        </SidebarBody>
      </SidebarContainer>

      <SidebarContent isExpanded={isExpanded} />
    </>
  );
};

export default SidebarLayout;
