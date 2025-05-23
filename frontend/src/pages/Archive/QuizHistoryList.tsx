import type { FilterSetters, ScoreRange, StatusFilter } from "./types";
import RenderList from "../../components/common/RenderList";
import Loader from "../../components/common/Loader";
import NoFilteredQuizzes from "./NoFilteredQuizzes";
import { useQuery } from "@tanstack/react-query";
import CompleteFilter from "./CompleteFilter";
import { ScoreFilter } from "./ScoreFilter";
import type { Quiz } from "./types";
import { useTheme } from "@/hooks";
import QuizCard from "./QuizCard";
import { useState } from "react";
import { QuizAPI } from "@/api";

const QuizHistoryList = () => {
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [scoreRanges, setScoreRanges] = useState<ScoreRange[]>([]);
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

  if (isLoading) return <Loader text="Loading Quizzes" />;
  if (error) return <>Failed to load quiz history.</>;

  const sessions = quizzes?.sessions || [];

  const filtered = sessions.filter((quiz: Quiz) => {
    const scorePercentage =
      quiz.currentQuestionIndex > 0
        ? (quiz.score / quiz.currentQuestionIndex) * 100
        : 0;
    const statusMatch =
      filter === "all"
        ? true
        : filter === "completed"
          ? quiz.completed
          : !quiz.completed;

    let scoreMatch = true;
    if (scoreRanges.length > 0) {
      scoreMatch = scoreRanges.some((range) => {
        if (range === "0-49")
          return scorePercentage >= 0 && scorePercentage < 50;
        if (range === "50-79")
          return scorePercentage >= 50 && scorePercentage < 80;
        if (range === "80-100")
          return scorePercentage >= 80 && scorePercentage <= 100;
        return false;
      });
    }

    return statusMatch && scoreMatch;
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

  const filterSetters: FilterSetters = {
    toAll: () => setFilter("all"),
    toCompleted: () => setFilter("completed"),
    toIncompleted: () => setFilter("incomplete"),
  };

  const handleScoreRangeChange = (ranges: ScoreRange[]) => {
    setScoreRanges(ranges);
  };

  return (
    <div
      className={`space-y-4 flex flex-col gap-6 ${isDark ? "bg-gray-800 text-white" : "bg-white text-slate-600"}`}
    >
      <div className="flex gap-16">
        <CompleteFilter
          filter={filter}
          filterSetters={filterSetters}
          isDark={false}
        />
        <ScoreFilter onFilterChange={handleScoreRangeChange} />
      </div>

      {filtered.length === 0 ? (
        <NoFilteredQuizzes filter={filter} />
      ) : (
        <div className="grid grid-flow-row gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <RenderList data={filtered} renderFn={renderQuizCard} />
        </div>
      )}
    </div>
  );
};

export default QuizHistoryList;
