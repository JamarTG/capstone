import TopicCard from "./TopicCard";
import { Topic } from "./QuizCard";
import { CreateQuizPayload, SuccessfulQuizResponse } from "../../types/auth";
import { AxiosError } from "axios";
import { UseMutateFunction } from "@tanstack/react-query";

const TopicContainer = ({
  isLoading,
  isError,
  topics,
  createQuizMutate,
}: {
  isLoading: boolean;
  isError: boolean;
  topics: Topic[];
  createQuizMutate: UseMutateFunction<SuccessfulQuizResponse, AxiosError<unknown, any>, CreateQuizPayload, unknown>;
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
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
          <div
            key={topic._id}
            className="h-[180px] w-full"
          >
            <TopicCard
              topic={topic}
              onClick={() => createQuizMutate({ section: 1 })}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default TopicContainer;
