import { Topic } from "../../data/sample/topics";

interface ObjectivesListProps {
  selectedTopic: Topic | null;
}

const ObjectivesList: React.FC<ObjectivesListProps> = ({ selectedTopic }) => {
  return (
    <div>
      {selectedTopic && (
      <div>
        {selectedTopic.objectives.map((objective, index) => (
          <li
            key={index}
            className="text-lg text-gray-700"
          >
            {objective}
          </li>
        ))}
      </div>
      )}
    </div>
  );
};

export default ObjectivesList;
