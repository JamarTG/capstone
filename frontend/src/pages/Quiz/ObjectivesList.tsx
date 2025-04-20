import React from "react";
import { Topic } from "../../components/QuizCard";
import Icon from "@mdi/react";
import { mdiAlertCircleOutline } from "@mdi/js";
import { useTheme } from "../../context/ThemeContext";

interface ObjectivesListProps {
  selectedTopic: Topic | null;
}

const ObjectivesList: React.FC<ObjectivesListProps> = ({ selectedTopic }) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (!selectedTopic) return null;

  const hasObjectives = selectedTopic.objectives && selectedTopic.objectives.length > 0;

  return (
    <div className="mt-4">
      {hasObjectives ? (
        <ul className={`list-disc ml-6 space-y-1`}>
          {selectedTopic.objectives.map((objective, index) => (
            <li
              key={index}
              className={`text-sm ${isDark ? "text-gray-200" : "text-gray-700"}`}
            >
              {objective.description}
            </li>
          ))}
        </ul>
      ) : (
        <div className={`flex text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          <Icon
            path={mdiAlertCircleOutline}
            size={0.9}
            className="mr-2"
          />
          No objectives available for this topic.
        </div>
      )}
    </div>
  );
};

export default ObjectivesList;
