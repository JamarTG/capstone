import RenderList from "../../components/common/RenderList";
import QuizCard from "../Quiz/QuizCard";

interface QuizHistoryListProps {
  quizzes: Quiz[];
}

const QuizHistoryList = ({ quizzes }: QuizHistoryListProps) => {
  return (
    <div className="grid grid-flow-row gap-4 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <RenderList
        data={quizzes}
        renderFn={(quiz) => (
          <QuizCard
            topicIndex={quiz.topicIndex}
            score={quiz.score}
            lastAttempt={quiz.lastAttempt}
            tags={quiz.tags}
          />
        )}
      />
    </div>
  );
};

export default QuizHistoryList;
