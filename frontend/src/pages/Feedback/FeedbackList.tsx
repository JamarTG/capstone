import React, { useState } from "react";
import { FeedbackEntry } from "../../types/feedback";
import { useTheme } from "../../context/ThemeContext";
import Icon from "@mdi/react";
import { mdiChevronDown, mdiChevronRight } from "@mdi/js";

interface FeedbackListProps {
  feedbacks: FeedbackEntry[];
}

const FeedbackList: React.FC<FeedbackListProps> = ({ feedbacks }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const grouped = feedbacks.reduce<Record<string, FeedbackEntry[]>>((acc, entry) => {
    if (!acc[entry.section]) acc[entry.section] = [];
    acc[entry.section].push(entry);
    return acc;
  }, {});

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  if (feedbacks.length === 0) {
    return <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>No feedback available yet.</p>;
  }

  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([section, entries]) => {
        const isOpen = openSections[section] ?? true;

        return (
          <div
            key={section}
            className={`border rounded-md transition-colors duration-200 ${
              isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
            }`}
          >
            <button
              onClick={() => toggleSection(section)}
              className={`w-full px-4 py-3 flex items-center justify-between font-semibold text-left ${
                isDark ? "text-gray-100" : "text-slate-600"
              }`}
            >
              <span>{section}</span>
              <Icon
                path={isOpen ? mdiChevronDown : mdiChevronRight}
                size={0.8}
                color={isDark ? "#e5e7eb" : "#475569"} // Tailwind's slate-600
              />
            </button>

            {isOpen && (
              <div className="px-4 pb-4 space-y-3">
                {entries.map((entry, idx) => (
                  <div
                    key={idx}
                    className="border-l-2 pl-4 text-sm"
                  >
                    <span className="block text-gray-400 text-xs mb-1">{new Date(entry.created_at).toLocaleString()}</span>
                    <p className={isDark ? "text-gray-300" : "text-slate-600"}>{entry.feedback}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FeedbackList;
