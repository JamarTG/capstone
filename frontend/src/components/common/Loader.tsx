import { Icon } from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import { useTheme } from "../../context/ThemeContext";

interface LoaderProps {
  text: string;
}

const Loader: React.FC<LoaderProps> = ({ text }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
        <div
          className={`p-6 rounded-full transition-colors ${
            isDark ? "bg-slate-700" : "bg-gray-100"
          }`}
        >
          <Icon
            path={mdiLoading}
            size={2}
            className={`animate-spin ${
              isDark ? "text-gray-300" : "text-gray-400"
            }`}
          />
        </div>
        <h3
          className={`text-xl font-medium ${
            isDark ? "text-white" : "text-gray-700"
          }`}
        >
          {text}
        </h3>
      </div>
    </div>
  );
};

export default Loader;
