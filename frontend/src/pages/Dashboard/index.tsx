import { useEffect, useState } from "react";
import PageLayout from "../../components/layout/Page";
import { useTheme } from "../../context/ThemeContext";
import { useQuery } from "@tanstack/react-query";
import { UserAPI } from "../../utils/api";
import useAuthRedirect from "../../hook/useAuthRedirect";
import { UserProfileData } from "../../types/settings";
import FeedbackList from "../Feedback/FeedbackList";
import SectionHeader from "../../components/SectionHeader";
import { mdiClipboardOutline } from "@mdi/js";
import { FeedbackEntry } from "../../types/feedback";

const DashboardPage = () => {
  const dummyFeedbacks: FeedbackEntry[] = [
    {
      section: "Section 1",
      feedback: "You struggled with identifying the correct variable type.",
      created_at: "2025-04-17T14:30:00Z",
    },
    {
      section: "Section 2",
      feedback: "You missed the use of conditional logic in question 3.",
      created_at: "2025-04-12T10:15:00Z",
    },
    {
      section: "Section 3",
      feedback: "Loop structure was used incorrectly.",
      created_at: "2025-04-05T08:45:00Z",
    },
  ];

  useAuthRedirect();
  const { theme } = useTheme();
  const isDark = theme === "dark";

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

  useEffect(() => {
    if (data) setUser(data.data);
  }, [data]);

  return (
    <PageLayout title="Dashboard">
      <div
        className={`p-8 rounded-xl flex flex-col gap-12 ${isDark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"} border ${isDark ? "border-gray-700" : "border-gray-200"}`}
      >

        <div>
          <h1 className="text-3xl font-semibold">
            Welcome back, {user.firstName}!
          </h1>
          <p className="text-lg mt-2">Let's get you started today.</p>
        </div>

    
        <div className={"flex flex-col gap-6"}>
          <SectionHeader iconPath={mdiClipboardOutline} title="Quiz Feedback" />
          <FeedbackList feedbacks={dummyFeedbacks} />
        </div>
      </div>
    </PageLayout>
  );
};

export default DashboardPage;
