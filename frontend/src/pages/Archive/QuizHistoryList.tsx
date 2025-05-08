import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { QuizAPI } from "../../utils/api";
import { Quiz } from "../../types/quiz";
import QuizCard from "../../components/quiz/QuizCard";
import RenderList from "../../components/common/RenderList";
import NoFilteredQuizzes from "./NoFilteredQuizzes";
import { useTheme } from "../../context/ThemeContext";
import Loader from "../../components/common/Loader";
import React from "react";

const QuizHistoryList = () => {
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">("all");
  const { isDark } = useTheme();

  const {
    data: quizzes,
    isLoading,
    error,
    refetch: quizRefetch,
  } = useQuery({
    queryKey: ["get-quizzes"],
    queryFn: QuizAPI.getQuizzes,
  });

  if (isLoading) return <Loader text={"Loading Quizzes"} />;
  if (error) return <React.Fragment>Failed to load quiz history.</React.Fragment>;

  const sessions = quizzes?.sessions || [];

  const filtered = sessions.filter((quiz: Quiz) => {
    if (filter === "completed") return quiz.completed;
    if (filter === "incomplete") return !quiz.completed;
    return true;
  });

  const renderQuizCard = (quiz: Quiz) => (
    <QuizCard
      currentQuestionIndex={quiz.currentQuestionIndex}
      quizRefetch={quizRefetch}
      quizId={quiz._id}
      section={quiz.section}
      score={quiz.score}
      completed={quiz.completed}
      lastAttempt={quiz.endTime || quiz.startTime}
    />
  );

  const setFilterToAll = () => {
    setFilter("all");
  };

  const setFilterToCompleted = () => {
    setFilter("completed");
  };

  const setFilterToIncomplete = () => {
    setFilter("incomplete");
  };

  return (
    <div className={`space-y-4 ${isDark ? "bg-gray-800 text-white" : "bg-white text-slate-600"}`}>
      <div className="flex gap-3">
        <button
          onClick={setFilterToAll}
          className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
            filter === "all"
              ? isDark
                ? "bg-slate-600 text-white"
                : "bg-slate-600 text-white"
              : isDark
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-gray-200 text-slate-600 hover:bg-gray-300"
          }`}
        >
          All
        </button>
        <button
          onClick={setFilterToCompleted}
          className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
            filter === "completed"
              ? isDark
                ? "bg-green-600 text-white"
                : "bg-green-600 text-white"
              : isDark
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-gray-200 text-slate-600 hover:bg-gray-300"
          }`}
        >
          Completed
        </button>
        <button
          onClick={setFilterToIncomplete}
          className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
            filter === "incomplete"
              ? isDark
                ? "bg-yellow-500 text-white"
                : "bg-yellow-500 text-white"
              : isDark
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-gray-200 text-slate-600 hover:bg-gray-300"
          }`}
        >
          In Progress
        </button>
      </div>

      {filtered.length === 0 ? (
        <NoFilteredQuizzes filter={filter} />
      ) : (
        <div className="grid grid-flow-row gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <RenderList
            data={filtered}
            renderFn={renderQuizCard}
          />
        </div>
      )}
    </div>
  );
};

export default QuizHistoryList;
