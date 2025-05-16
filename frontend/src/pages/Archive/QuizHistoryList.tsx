import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { QuizAPI } from "../../utils/api";
import type { Quiz } from "../../types/quiz";
import QuizCard from "../../components/quiz/QuizCard";
import RenderList from "../../components/common/RenderList";
import NoFilteredQuizzes from "./NoFilteredQuizzes";
import { useTheme } from "../../hooks/useTheme";
import Loader from "../../components/common/Loader";
import { ScoreFilter } from "./ScoreFilter";
import CompleteFilter from "./CompleteFilter";

type ScoreRange = "0-49" | "50-79" | "80-100";

const QuizHistoryList = () => {
  const [filter, setFilter] = useState<"all" | "completed" | "incomplete">("all");
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

  if (isLoading) return <Loader text={"Loading Quizzes"} />;
  if (error) return <>Failed to load quiz history.</>;

  const sessions = quizzes?.sessions || [];

  const filtered = sessions.filter((quiz: Quiz) => {
  
    const scorePercentage = quiz.currentQuestionIndex > 0 ? (quiz.score / quiz.currentQuestionIndex) * 100 : 0;
    const statusMatch = filter === "all" ? true : filter === "completed" ? quiz.completed : !quiz.completed;

    let scoreMatch = true;
    if (scoreRanges.length > 0) {
      scoreMatch = scoreRanges.some((range) => {
        if (range === "0-49") return scorePercentage >= 0 && scorePercentage < 50;
        if (range === "50-79") return scorePercentage >= 50 && scorePercentage < 80;
        if (range === "80-100") return scorePercentage >= 80 && scorePercentage <= 100;
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

  const setFilterToAll = () => {
    setFilter("all");
  };

  const setFilterToCompleted = () => {
    setFilter("completed");
  };

  const setFilterToIncomplete = () => {
    setFilter("incomplete");
  };

  const handleScoreRangeChange = (ranges: ScoreRange[]) => {
    setScoreRanges(ranges);
  };

  return (
    <div className={`space-y-4 flex flex-col gap-6 ${isDark ? "bg-gray-800 text-white" : "bg-white text-slate-600"}`}>
      <div className="flex gap-16">
        <CompleteFilter
          filter={filter}
          setFilterToAll={setFilterToAll}
          setFilterToCompleted={setFilterToCompleted}
          setFilterToIncomplete={setFilterToIncomplete}
          isDark={false}
        />
        <ScoreFilter onFilterChange={handleScoreRangeChange} />
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
