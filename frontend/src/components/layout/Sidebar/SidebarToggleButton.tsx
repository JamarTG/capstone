import { Icon } from "@iconify/react/dist/iconify.js";
import { IconifyIcons } from "@/icons";
import { useTheme } from "@/hooks";
import type { FC } from "react";

interface SidebarToggleButtonProps {
  isExpanded: boolean;
  toggleSidebar: VoidFunction;
}

const SidebarToggleButton: FC<SidebarToggleButtonProps> = ({
  toggleSidebar,
  isExpanded,
}) => {
  const { isDark } = useTheme();

  return (
    <div className="p-2 flex cursor-pointer">
      <button
        onClick={toggleSidebar}
        className={`w-full flex items-center justify-center rounded-lg transition-colors duration-200 ${
          isDark ? "hover:bg-gray-700" : "hover:bg-gray-300"
        }`}
      >
        <Icon
          icon={
            isExpanded
              ? IconifyIcons.chevronDoubleLeft
              : IconifyIcons.chevronDoubleRight
          }
          width={24}
          height={24}
        />
      </button>
    </div>
  );
};

export default SidebarToggleButton;
