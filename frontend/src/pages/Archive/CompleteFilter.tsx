import type { FC } from "react";
import type { FilterSetters, StatusFilter } from "./types";
import { ThemeContextProps } from "../../context/ThemeContext";

interface CompleteFilterProps {
  filter: StatusFilter;
  filterSetters: FilterSetters
  isDark: ThemeContextProps["isDark"];
}

const CompleteFilter: FC<CompleteFilterProps> = ({  filter, isDark, filterSetters }) => {
  return (
    <div className="flex justify-center items-center gap-3">
      <button
        onClick={filterSetters.toAll}
        className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
          filter === "all"
            ? isDark
              ? "bg-slate-600 text-white"
              : "bg-slate-600 text-white"
            : isDark
              ? "bg-gray-700 text-white hover:bg-gray-600"
              : "bg-gray-200 text-slate-600 hover:bg-gray-300"
        }`}
      >
        All
      </button>
      <button
        onClick={filterSetters.toCompleted}
        className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
          filter === "completed"
            ? isDark
              ? "bg-green-600 text-white"
              : "bg-green-600 text-white"
            : isDark
              ? "bg-gray-700 text-white hover:bg-gray-600"
              : "bg-gray-200 text-slate-600 hover:bg-gray-300"
        }`}
      >
        Completed
      </button>
      <button
        onClick={filterSetters.toIncompleted}
        className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
          filter === "incomplete"
            ? isDark
              ? "bg-yellow-500 text-white"
              : "bg-yellow-500 text-white"
            : isDark
              ? "bg-gray-700 text-white hover:bg-gray-600"
              : "bg-gray-200 text-slate-600 hover:bg-gray-300"
        }`}
      >
        In Progress
      </button>
    </div>
  );
};

export default CompleteFilter;
