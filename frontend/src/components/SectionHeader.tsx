import Icon from "@mdi/react";
import { IconProps } from "@tabler/icons-react";

interface SectionHeaderProps {
  iconPath: IconProps["path"];
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ iconPath, title }) => {
  return (
    <div>
      <div className="flex items-center">
        <Icon
          path={iconPath!}
          size={1}
          className="text-slate-600 mr-2"
        />
        <h2 className="text-xl font-medium text-slate-600">{title}</h2>
      </div>
    </div>
  );
};

export default SectionHeader;
