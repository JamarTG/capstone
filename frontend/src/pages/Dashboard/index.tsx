import Icon from "@mdi/react";
import { mdiChartLine } from "@mdi/js";
import PageLayout from "../../components/layout/Page";
import useAuthRedirect from "../../hook/useAuthRedirect";
import { dashboardData } from "../../data/sample/dashboard";
import LearningPath from "./LearningPath";
import ProgressChart from "./ProgressChart";


const QuizDashboard = () => {
  useAuthRedirect();

  return (
    <PageLayout title="Dashboard">
      <div className="flex flex-col px-4 py-6 space-y-5">
        <div className="flex items-center">
          <Icon path={mdiChartLine} size={1} className="text-slate-600 mr-2" />
          <h2 className="text-xl font-medium text-slate-600">Your Progress</h2>
        </div>
        <ProgressChart data={dashboardData.scoreTrend} />
        <LearningPath items={dashboardData.learningPath.items} />
      </div>
    </PageLayout>
  );
};

export default QuizDashboard;
