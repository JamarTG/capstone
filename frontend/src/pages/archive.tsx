import RenderList from "../components/common/render-list";
import PageContent from "../components/layout/page-content";
import QuizCard from "../components/quiz/quiz-result";
import SelectDropdown from "../components/ui/select-dropdown";
import { quizData } from "../data/sample/results";
import useAuthRedirect from "../hook/useAuthRedirect";

const QuizHistory = () => {
  useAuthRedirect();

  return (
    <PageContent title="Archive">
      <SelectDropdown options={["date", "score"]} />
      <div className="responsive-grid">
        <RenderList
          data={quizData}
          renderFn={(quiz) => {
            return (
              <QuizCard
                key={quiz.id}
                score={quiz.score}
                lastAttempt={quiz.lastAttempt}
                tags={quiz.tags}
              />
            );
          }}
        />
      </div>
    </PageContent>
  );
};

export default QuizHistory;
