import {Icon} from "@iconify/react";
import { IconProps } from "@tabler/icons-react";
import { useTheme } from "../context/ThemeContext";

interface SectionHeaderProps {
  iconPath: IconProps["path"];
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ iconPath, title }) => {
   const { isDark } = useTheme();

  return (
    <div className={`flex items-center ${isDark ? "bg-gray-800 p-4 rounded-lg" : "bg-white p-4 rounded-lg"}`}>
      <Icon
        icon={iconPath!}
  
        className={`${isDark ? "text-gray-100" : "text-slate-600"} mr-2`}
      />
      <h2 className={`text-xl font-medium ${isDark ? "text-gray-100" : "text-slate-800"}`}>{title}</h2>
    </div>
  );
};

export default SectionHeader;
