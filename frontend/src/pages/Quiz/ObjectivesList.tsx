import React from "react";
import { Topic } from "./QuizCard";

interface ObjectivesListProps {
  selectedTopic: Topic | null;
}

const ObjectivesList: React.FC<ObjectivesListProps> = ({ selectedTopic }) => {
  return (
    <React.Fragment>
      {selectedTopic && (
      <div>
        {selectedTopic.objectives.map((objective, index) => (
          <li
            key={index}
            className="text-sm text-gray-700"
          >
            {objective}
          </li>
        ))}
      </div>
      )}
    </React.Fragment>
  );
};

export default ObjectivesList;
