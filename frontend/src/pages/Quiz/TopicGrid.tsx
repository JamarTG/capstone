import TopicCard from "./TopicCard";
import { Topic } from "./QuizCard";

const TopicGrid = ({
  isLoading,
  isError,
  topics,
  onSelectTopic,
}: {
  isLoading: boolean;
  isError: boolean;
  topics: Topic[];
  onSelectTopic: (topic: Topic) => void;
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {isLoading ? (
        Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-[180px] w-full bg-gray-200 animate-pulse rounded-lg"
          />
        ))
      ) : isError ? (
        <div className="text-red-500 col-span-full">Failed to load topics.</div>
      ) : (
        topics.map((topic) => (
          <div key={topic._id} className="h-[180px] w-full">
            <TopicCard topic={topic} onClick={() => onSelectTopic(topic)} />
          </div>
        ))
      )}
    </div>
  );
};

export default TopicGrid;

