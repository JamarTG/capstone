import PageLayout from "../../components/layout/Page";
import QuizHistoryList from "./QuizHistoryList";
import useAuthRedirect from "../../hook/useAuthRedirect";
import SectionHeader from "../../components/SectionHeader";
import { mdiHistory } from "@mdi/js";

const QuizHistory = () => {
  useAuthRedirect();

  return (
    <PageLayout title="History">
      <div className="flex flex-col justify-center">
        <div className="mb-10">
          <SectionHeader
            iconPath={mdiHistory}
            title={"History List"}
          />
        </div>
        <div className="h-full h-4/5 p-10">
          <QuizHistoryList />
        </div>
      </div>
    </PageLayout>
  );
};

export default QuizHistory;
