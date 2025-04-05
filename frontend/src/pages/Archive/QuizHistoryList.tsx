import { useQuery } from "@tanstack/react-query";
import { QuizAPI } from "../../utils/api";
import { Quiz } from "../../types/quiz";
import QuizCard from "../Quiz/QuizCard";
import RenderList from "../../components/common/RenderList";

const QuizHistoryList = () => {
  const { data: quizzes, isLoading, error } = useQuery({
    queryKey: ["get-quizzes"],
    queryFn: QuizAPI.getQuizzes,
  });

  if (isLoading) return <div>Loading quizzes...</div>;
  if (error) return <div>Failed to load quiz history.</div>;

  if (!quizzes || quizzes.length === 0) {
    return <div className="text-gray-500 italic">No quiz history found.</div>;
  }

  return (
    <div className="grid grid-flow-row gap-4 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <RenderList
        data={quizzes.sessions}
        renderFn={(quiz: Quiz) => (
          <QuizCard
            topic={quiz.topic}
            score={quiz.score}
            completed={quiz.completed}
            lastAttempt={quiz.endTime || quiz.startTime}
            tags={quiz.tags || []}
          />
        )}
      /> 
    </div>
  );
};

export default QuizHistoryList;
