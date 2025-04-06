import Button from "../../components/ui/Button";
import Icon from "@mdi/react";
import { mdiPlayCircleOutline, mdiBullseye } from "@mdi/js";
import { Topic } from "./QuizCard";
import ObjectivesList from "./ObjectivesList";

const QuizSidebar = ({
    selectedTopic,
    onStart,
    topicsLoading,
  }: {
    selectedTopic: Topic | null;
    onStart: () => void;
    topicsLoading: boolean;
  }) => {
    const Skeleton = () => (
      <div className="bg-white w-full h-full rounded-lg p-6 flex flex-col justify-between animate-pulse space-y-4">
        <div className="space-y-3">
          <div className="h-4 w-1/2 bg-gray-200 rounded" />
          <div className="h-1 border-b border-gray-200" />
          <div className="h-4 w-1/3 bg-gray-200 rounded" />
          <div className="space-y-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-3 w-full bg-gray-200 rounded" />
            ))}
          </div>
        </div>
        <div className="h-10 w-full bg-gray-300 rounded" />
      </div>
    );
  
    return (
      <div className="flex rounded-lg justify-center items-center border border-gray-200 w-full lg:w-2/5 h-[460px]">
        {topicsLoading ? (
          <Skeleton />
        ) : selectedTopic ? (
          <div className="bg-white w-full h-full rounded-lg p-6 sticky top-20 flex flex-col justify-between">
            <div className="h-full">
              <h2 className="flex text-sm font-semibold text-gray-800 mb-2 items-center gap-2">
                <Icon path={mdiBullseye} size={1} />
                <p>{selectedTopic.name} Quiz</p>
              </h2>
  
              <div className="border-b border-gray-200 mb-4"></div>
  
              <h4 className="text-sm text-gray-600 font-medium mb-2">Objectives</h4>
              <div className="text-sm text-gray-700 space-y-1 mb-4">
                <ObjectivesList selectedTopic={selectedTopic} />
              </div>
            </div>
  
            <Button variant="primary" onClick={onStart}>
              <Icon path={mdiPlayCircleOutline} size={0.9} className="mr-2" />
              Start Quiz
            </Button>
          </div>
        ) : (
          <div className="text-gray-400 text-sm italic mt-4 px-4 text-center w-full">
            Select a topic to view details.
          </div>
        )}
      </div>
    );
  };

  export default QuizSidebar;