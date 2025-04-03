import React from "react";

interface PreferencesProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Preferences: React.FC<PreferencesProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className="p-6 min-w-90 border border-gray-200">
      <h3 className="text-md text-slate-600 font-semibold mb-3">Preferences</h3>
      <div className="mb-4 flex justify-between items-center">
        <span className="text-md font-semibold">Dark Mode</span>
        <div className="relative inline-block w-14 h-6">
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              id="switch-3"
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
              className="peer sr-only"
            />
            <label
              htmlFor="switch-3"
              className="hidden"
            ></label>
            <div className="peer h-4 w-11 rounded bg-slate-200 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-md after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-600 peer-checked:after:translate-x-full peer-focus:ring-green-300"></div>
          </label>
        </div>
      </div>
      
    </div>
  );
};

export default Preferences;
