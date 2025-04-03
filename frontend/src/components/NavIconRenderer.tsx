import React from "react";
import { 
  IconHome,
  IconHelp,
  IconArchive,
  IconSettings,
  IconLogout,
  IconMenu,
  IconX
} from "@tabler/icons-react";

interface IconRendererProps {
  icon: string;
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
}

const IconRenderer: React.FC<IconRendererProps> = ({ 
  icon, 
  className, 
  size = 28, 
  color = "currentColor",
  strokeWidth = 1.5 
}) => {
  const getIcon = (iconName: string) => {

    switch (iconName) {
      case "home":
        return <IconHome size={size} color={color} strokeWidth={strokeWidth} className={className} />;
      case "quiz":
        return <IconHelp size={size} color={color} strokeWidth={strokeWidth} className={className} />;
      case "archive":
        return <IconArchive size={size} color={color} strokeWidth={strokeWidth} className={className} />;
      case "settings":
        return <IconSettings size={size} color={color} strokeWidth={strokeWidth} className={className} />;
      case "logout":
        return <IconLogout size={size} color={color} strokeWidth={strokeWidth} className={className} />;
      case "menu-open":
        return <IconMenu size={size} color={color} strokeWidth={strokeWidth} className={className} />;
      case "menu-close":
        return <IconX size={size} color={color} strokeWidth={strokeWidth} className={className} />;
      default:
        return <IconHelp size={size} color={color} strokeWidth={strokeWidth} className={className} />;
    }
  };

  return getIcon(icon);
};

export default IconRenderer;