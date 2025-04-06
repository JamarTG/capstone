import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { QuizAPI } from "../../utils/api";
import { Quiz } from "../../types/quiz";
import QuizCard from "../Quiz/QuizCard";
import RenderList from "../../components/common/RenderList";
import EmptyQuizHistory from "./EmptyQuizHistory";

const QuizHistoryList = () => {
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">("all");

  const {
    data: quizzes,
    isLoading,
    error,
    refetch: quizRefetch,
  } = useQuery({
    queryKey: ["get-quizzes"],
    queryFn: QuizAPI.getQuizzes,
  });

  if (isLoading) return <div>Loading quizzes...</div>;
  if (error) return <div>Failed to load quiz history.</div>;

  const sessions = quizzes?.sessions || [];

  const filtered = sessions.filter((quiz: Quiz) => {
    if (filter === "completed") return quiz.completed;
    if (filter === "incomplete") return !quiz.completed;
    return true;
  });

  if (filtered.length === 0) return <EmptyQuizHistory />;

  return (
    <div className="space-y-4">
     
      <div className="flex gap-3">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded-full text-sm cursor-pointer  ${
            filter === "all" ? "bg-slate-600 text-white" : "bg-gray-200 text-slate-600"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
            filter === "completed" ? "bg-green-600 text-white" : "bg-gray-200 text-slate-600"
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("incomplete")}
          className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
            filter === "incomplete" ? "bg-yellow-500 text-white" : "bg-gray-200 text-slate-600"
          }`}
        >
          In Progress
        </button>
      </div>

      <div className="grid grid-flow-row gap-4 text-slate-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <RenderList
          data={filtered}
          renderFn={(quiz: Quiz) => (
            <QuizCard
              currentQuestionIndex={quiz.currentQuestionIndex}
              quizRefetch={quizRefetch}
              quizId={quiz._id}
              topic={quiz.topic}
              score={quiz.score}
              completed={quiz.completed}
              lastAttempt={quiz.endTime || quiz.startTime}
              tags={quiz.tags || []}
            />
          )}
        />
      </div>
    </div>
  );
};

export default QuizHistoryList;
