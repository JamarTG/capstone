import RenderList from "../components/common/RenderList";
import PageContent from "../components/layout/PageLayout";
import ConditionalSVG from "../components/ConditionalSVG";
import QuizCard from "../components/quiz/QuizResults";
import SelectDropdown from "../components/ui/UISelectDropdown";
import { quizData } from "../data/sample/results";
import useAuthRedirect from "../hook/useAuthRedirect";

const QuizHistory = () => {
  useAuthRedirect();

  return (
    <PageContent
      title="Quiz Archive ..."
      svg={
        <ConditionalSVG
          path={"archive"}
          size={45}
        />
      }
    >
      <SelectDropdown options={["date", "score"]} />
      <div className="responsive-grid">
        <RenderList
          data={quizData}
          renderFn={(quiz) => {
            return (
              <QuizCard
                key={quiz.topicIndex}
                topicIndex={quiz.topicIndex}
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
