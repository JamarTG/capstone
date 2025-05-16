import type { FC } from "react";
import { useTheme } from "../../hooks/useTheme";

interface ChangeThemeProps {
  darkMode: boolean;
}

const ChangeTheme: FC<ChangeThemeProps> = ({ darkMode}) => {
  const { isDark ,toggleTheme } = useTheme();
  

  return (
    <div className={`p-6 min-w-90 border rounded-md ${isDark ? "border-gray-700" : "border-gray-200"}`}>
      <h3 className={`text-md mb-3 ${isDark ? "text-gray-100" : "text-slate-600"}`}>Preferences</h3>
      <div className="mb-4 flex justify-between items-center">
        <span className={`text-md ${isDark ? "text-gray-200" : ""}`}>Dark Mode</span>
        <div className="relative inline-block w-14 h-6">
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              id="switch-3"
              type="checkbox"
              checked={darkMode}
              onChange={toggleTheme}
              className="peer sr-only"
            />
            <label htmlFor="switch-3" className="hidden"></label>
            <div className="peer h-4 w-11 rounded bg-slate-200 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-md after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-600 peer-checked:after:translate-x-full peer-focus:ring-green-300"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ChangeTheme;
