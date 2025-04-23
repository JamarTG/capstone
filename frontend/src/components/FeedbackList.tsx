import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import Icon from "@mdi/react";
import { mdiChevronRight, mdiClose } from "@mdi/js";
import { Section_Map } from "../constants";

interface Feedback {
  feedback: string;
  section: number;
}

interface FeedbackListProps {
  feedbacks: Feedback[];
}

const FeedbackList: React.FC<FeedbackListProps> = ({ feedbacks = [] }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const grouped = feedbacks.reduce<Record<string, Feedback[]>>((acc, entry) => {
    const sectionKey = `${entry.section}`;
    if (!acc[sectionKey]) acc[sectionKey] = [];
    acc[sectionKey].push(entry);
    return acc;
  }, {});

  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const closeSection = () => {
    setOpenSection(null);
  };

  const sectionNumbers = Array.from({ length: 8 }, (_, i) => (i + 1).toString());

  if (openSection) {
    const entries = grouped[openSection] || [];
    const sectionName = Section_Map[parseInt(openSection)].name;

    return (
      <div className="w-full">
        <div
          className={`border rounded-lg shadow-md transition-all duration-300 ${isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}
        >
          <div className="sticky top-0 px-5 py-4 flex items-center justify-between ${isDark ? 'border-gray-700' : 'border-gray-200'}">
            <div  className="flex items-center gap-2">
              <h3 className={`font-bold text-lg ${isDark ? "text-gray-100" : "text-slate-700"}`}>{`Section ${openSection}`}</h3>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-slate-500"}`}>{sectionName}</p>
            </div>
            <button
              onClick={closeSection}
              className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${isDark ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-100 text-slate-500"}`}
              aria-label="Close section"
            >
              <Icon
                path={mdiClose}
                size={1}
                color="currentColor"
              />
            </button>
          </div>

          <div className="p-5 max-h-96 overflow-y-auto">
            {entries.length > 0 ? (
              <div className="space-y-4">
                {entries.map((entry, idx) => (
                  <div
                    key={idx}
                    className={`border border-gray-700 pl-5 py-3 rounded-md bg-opacity-20 ${
                      isDark ? "bg-gray-800 text-gray-200" : "bg-blue-50 text-slate-700"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{entry.feedback}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center py-12">
                <p className={`text-sm italic ${isDark ? "text-gray-500" : "text-gray-400"}`}>No feedback for this section.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {sectionNumbers.map((section) => {
        const entries = grouped[section] || [];
        const sectionName = Section_Map[parseInt(section)].name;
        const feedbackCount = entries.length;

        return (
          <div
            key={section}
            className={`border rounded-lg transition-all duration-200 hover:shadow-md ${
              isDark ? "border-gray-700 bg-gray-800 hover:border-gray-600" : "border-gray-200 bg-white hover:border-gray-300"
            }`}
          >
            <button
              onClick={() => toggleSection(section)}
              className={`cursor-pointer w-full px-4 py-3 flex flex-col text-left rounded-lg ${isDark ? "text-gray-100" : "text-slate-700"}`}
            >
              <div className="flex justify-between items-center w-full mb-1">
                <span className="font-medium">{`Section ${section}`}</span>
                <Icon
                  path={mdiChevronRight}
                  size={0.8}
                  color={isDark ? "#e5e7eb" : "#475569"}
                />
              </div>
              <span className={`text-sm truncate ${isDark ? "text-gray-400" : "text-slate-500"}`}>{sectionName}</span>
              <div
                className={`mt-2 text-xs ${
                  feedbackCount > 0 ? (isDark ? "text-blue-300" : "text-blue-600") : isDark ? "text-gray-500" : "text-gray-400"
                }`}
              >
                {feedbackCount > 0 ? `${feedbackCount} feedback items` : "No feedback"}
              </div>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default FeedbackList;
