import type { IconProps } from "@tabler/icons-react";
import { Icon } from "@iconify/react";
import { useTheme } from "@/hooks";
import type { FC } from "react";

interface SectionHeaderProps {
  iconPath: IconProps["path"];
  title: string;
}

const SectionHeader: FC<SectionHeaderProps> = ({ iconPath, title }) => {
  const { isDark } = useTheme();

  return (
    <div
      className={`flex items-center ${isDark ? "bg-gray-800 p-4 rounded-lg" : "bg-white p-4 rounded-lg"}`}
    >
      <Icon
        icon={iconPath!}
        className={`${isDark ? "text-gray-100" : "text-slate-600"} mr-2 text-3xl`}
      />
      <h2
        className={`text-xl font-medium ${isDark ? "text-gray-100" : "text-slate-800"}`}
      >
        {title}
      </h2>
    </div>
  );
};

export default SectionHeader;
