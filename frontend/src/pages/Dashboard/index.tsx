import SectionHeader from "../../components/common/SectionHeader";
import PageLayout from "../../components/layout/Page";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { Typewriter } from "react-simple-typewriter";
import FeedbackList from "./DashboardFeedbackList";
import { useQuery } from "@tanstack/react-query";
import type { UserData } from "../../types/user";
import { IconifyIcons } from "../../icons";
import { useTheme } from "@/hooks";
import { UserAPI } from "@/api";
import { QuizAPI } from "@/api";

const Dashboard = () => {
  useAuthRedirect();
  const { isDark } = useTheme();

  const { data: user } = useQuery<{ data: UserData }>({
    queryKey: ["get-profile-data"],
    queryFn: UserAPI.fetchUserInfo,
  });

  const { data: feedbackData } = useQuery({
    queryKey: ["user-feedbacks"],
    queryFn: () => QuizAPI.getUserFeedbacks().then((res) => res.data),
  });

  return (
    <PageLayout title="Dashboard">
      <div className={`p-2 flex flex-col`}>
        <div
          className={`p-2 rounded-xl ${isDark ? "border-gray-700 bg-gray-800" : "border-gray-200"}`}
        >
          <h1 className="text-4xl font-bold flex">
            <Typewriter
              words={[
                `Hey ${user?.data.firstName || "champ"}, ready to crush some IT today?`,
              ]}
              loop={1}
              cursor={false}
              typeSpeed={30}
              deleteSpeed={0}
              delaySpeed={2000}
            />
          </h1>
          <p className="text-md mt-2 text-gray-400">
            Let's level up your skills and tackle those tricky topics together
          </p>
        </div>

        <div
          className={`rounded-xl flex flex-col gap-1 ${isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}
        >
          <SectionHeader iconPath={IconifyIcons.clipboard} title="Feedback" />
          <FeedbackList feedbacks={feedbackData} />
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
