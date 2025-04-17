import Icon from "@mdi/react";
import { mdiChartLine } from "@mdi/js";
import PageLayout from "../../components/layout/Page";
import useAuthRedirect from "../../hook/useAuthRedirect";
import { dashboardData } from "../../data/sample/dashboard";
import LearningPath from "./LearningPath";
import ProgressChart from "./ProgressChart";
import { useTheme } from "../../context/ThemeContext";

const QuizDashboard = () => {
  useAuthRedirect();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <PageLayout title="Dashboard">
      <div className="flex flex-col space-y-5">
        <div className="flex items-center">
          <Icon path={mdiChartLine} size={1} className={`${isDark ? "text-gray-100" : "text-slate-600"} mr-2`} />
          <h2 className={`text-xl font-medium ${isDark ? "text-gray-100" : "text-slate-600"}`}>Your Progress</h2>
        </div>
        <ProgressChart data={dashboardData.scoreTrend} />
        <LearningPath items={dashboardData.learningPath.items} />
      </div>
    </PageLayout>
  );
};

export default QuizDashboard;
