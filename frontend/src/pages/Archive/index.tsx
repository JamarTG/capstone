import PageLayout from "../../components/layout/Page";
import QuizHistoryList from "./QuizHistoryList";
import useAuthRedirect from "../../hook/useAuthRedirect";
import SectionHeader from "../../components/SectionHeader";
import { mdiHistory } from "@mdi/js";

const QuizHistory = () => {
  useAuthRedirect();

  return (
    <PageLayout title="History">
      <div className="flex flex-col justify-center gap-3">
        <SectionHeader
          iconPath={mdiHistory}
          title={"History List"}
        />
        <QuizHistoryList />
      </div>
    </PageLayout>
  );
};

export default QuizHistory;
