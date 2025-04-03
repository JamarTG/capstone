import PageLayout from "../../components/layout/Page";
import QuizHistoryList from "./QuizHistoryList";
import { quizzes } from "../../data/sample/quizzes";
import useAuthRedirect from "../../hook/useAuthRedirect";

const QuizHistory = () => {
  useAuthRedirect();

  return (
    <PageLayout>
      <div className="flex justify-center">
        <QuizHistoryList quizzes={quizzes} />
      </div>
    </PageLayout>
  );
};

export default QuizHistory;
