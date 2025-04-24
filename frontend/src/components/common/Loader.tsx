import { Icon } from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import { useTheme } from "../../context/ThemeContext";

interface LoaderProps {
  text: string;
}

const Loader: React.FC<LoaderProps> = ({ text }) => {
   const { isDark } = useTheme();

  return (
    <div className="flex items-center justify-center h-screen bg-transparent">
      <div className="flex flex-col items-center gap-4 text-center animate-fade-in">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500 to-blue-500 blur-md animate-ping opacity-50" />
          <Icon
            path={mdiLoading}
            size={2}
            className={`animate-spin relative z-10 ${
              isDark ? "text-white" : "text-gray-700"
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
