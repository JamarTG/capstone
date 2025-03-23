import PageContent from "../components/layout/page-content";
import QuizCard from "../components/quiz/quiz-result";
import SelectDropdown from "../components/ui/select-dropdown";
import { quizData } from "../data/sample/results";
const QuizHistory = () => {
  return (
    <PageContent title="Archive">
      <SelectDropdown options={["date", "score"]} />
      <div className="px-5 grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3 overflow-auto h-full">
        {quizData.map((quiz) => (
          <QuizCard
            key={quiz.id}
            score={quiz.score}
            lastAttempt={quiz.lastAttempt}
            tags={quiz.tags}
          />
        ))}
      </div>
    </PageContent>
  );
};

export default QuizHistory;
