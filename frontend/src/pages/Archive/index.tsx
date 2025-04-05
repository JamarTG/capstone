import PageLayout from "../../components/layout/Page";
import QuizHistoryList from "./QuizHistoryList";
import useAuthRedirect from "../../hook/useAuthRedirect";

const QuizHistory = () => {
  useAuthRedirect();

  return (
    <PageLayout title="History">
      <div className="flex justify-center">
        <QuizHistoryList/>
      </div>
    </PageLayout>
  );
};

export default QuizHistory;
