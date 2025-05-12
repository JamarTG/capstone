import { useEffect, useState } from "react";
import PageLayout from "../../components/layout/Page";
import { useTheme } from "../../hooks/useTheme";
import { useQuery } from "@tanstack/react-query";
import { QuizAPI, UserAPI } from "../../utils/api";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import { UserProfileData } from "../../types/settings";
import FeedbackList from "./FeedbackList";
import SectionHeader from "../../components/SectionHeader";
import { Typewriter } from "react-simple-typewriter";
import { IconifyIcons } from "../../icons";

const Dashboard = () => {
  useAuthRedirect();
  const { isDark } = useTheme();

  const [user, setUser] = useState<UserProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    currentPassword: "",
    darkMode: isDark,
    createdAt: "",
  });

  const { data } = useQuery<{ data: UserProfileData }>({
    queryKey: ["get-profile-data"],
    queryFn: UserAPI.fetchUserInfo,
  });

  const { data: feedbackData } = useQuery({
    queryKey: ["user-feedbacks"],
    queryFn: () => QuizAPI.getUserFeedbacks().then((res) => res.data),
  });

  useEffect(() => {
    if (data) setUser(data.data);
  }, [data]);

  return (
    <PageLayout title="Dashboard">
      <div className={`p-2 flex flex-col`}>
        <div className={`p-2 rounded-xl ${isDark ? "border-gray-700 bg-gray-800" : "border-gray-200"}`}>
          <h1 className="text-4xl font-bold flex">
            <Typewriter
              words={[`Hey ${user.firstName || "champ"}, ready to crush some IT today?`]}
              loop={1}
              cursor={false}
              typeSpeed={30}
              deleteSpeed={0}
              delaySpeed={2000}
            />
          </h1>
          <p className="text-md mt-2 text-gray-400">Let’s level up your skills and tackle those tricky topics together</p>
        </div>

        <div className={`rounded-xl flex flex-col gap-1 ${isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}>
          <SectionHeader
            iconPath={IconifyIcons.clipboard}
            title="Feedback"
          />
          <FeedbackList feedbacks={feedbackData} />
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
