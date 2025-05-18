import SectionHeader from "../../components/common/SectionHeader";
import PageLayout from "../../components/layout/Page";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import QuizHistoryList from "./QuizHistoryList";
import { IconifyIcons } from "../../icons";

const QuizHistory = () => {
  useAuthRedirect();

  return (
    <PageLayout title="History">
      <div className="flex flex-col justify-center gap-3">
        <SectionHeader iconPath={IconifyIcons.history} title="History List" />
        <QuizHistoryList />
      </div>
    </PageLayout>
  );
};

export default QuizHistory;
