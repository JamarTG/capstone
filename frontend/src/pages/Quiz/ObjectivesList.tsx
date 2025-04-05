import React from "react";
import { Topic } from "../../data/sample/topics";

interface ObjectivesListProps {
  selectedTopic: Topic | null;
}

const ObjectivesList: React.FC<ObjectivesListProps> = ({ selectedTopic }) => {
  return (
    <React.Fragment>
      {selectedTopic && (
      <div>
        {selectedTopic.objectives.map((objective, index) => (
          <p
            key={index}
            className="text-sm text-gray-700 my-5"
          >
            {objective}
          </p>
        ))}
      </div>
      )}
    </React.Fragment>
  );
};

export default ObjectivesList;
