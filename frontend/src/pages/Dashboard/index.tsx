import { useEffect, useState } from "react";
import PageLayout from "../../components/layout/Page";
import { mdiAccountCircle, mdiEmail, mdiCalendar } from "@mdi/js";
import Icon from "@mdi/react";
import { useTheme } from "../../context/ThemeContext";
import { useQuery } from "@tanstack/react-query";
import { UserAPI } from "../../utils/api";
import useAuthRedirect from "../../hook/useAuthRedirect";
import { UserProfileData, UserSettings } from "../../types/settings";

const DashboardPage = () => {
  useAuthRedirect();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const [user, setUser] = useState<UserProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    currentPassword: "",
    darkMode: theme === "dark",
    createdAt: "",
  });

  const { data } = useQuery<{ data: UserProfileData }>({ queryKey: ["get-profile-data"], queryFn: UserAPI.fetchUserInfo });

  useEffect(() => {
    if (data) {
      setUser(data.data);
    }
  });
  // if (isLoading) {
  //   return <div>Loading...</div>; // Loading state
  // }

  // if (isError) {
  //   return <div>Error: {error.message}</div>; // Error state
  // }

  return (
    <PageLayout title="Dashboard">
      <div
        className={`flex flex-col gap-8 p-6 rounded-xl ${
          isDark ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
        } border ${isDark ? "border-gray-700" : "border-gray-200"}`}
      >
        {/* Profile Section */}
        <div className="mb-8">
          <h1 className={`text-3xl font-semibold ${isDark ? "text-gray-100" : "text-slate-800"}`}>
            Welcome back, {`${user.firstName} ${user.lastName}`}!
          </h1>
          <p className={`text-lg ${isDark ? "text-gray-300" : "text-slate-600"}`}>Here’s a quick overview of your profile information.</p>
        </div>

        <div className={`p-8 rounded-lg shadow-md ${isDark ? "bg-gray-700 text-gray-100" : "bg-white text-gray-900"}`}>
          <div className="flex items-center mb-6">
            <Icon
              path={mdiAccountCircle}
              size={2}
              className="text-indigo-500 mr-4"
            />
            <h2 className="text-2xl font-semibold">Profile Overview</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center">
              <Icon
                path={mdiAccountCircle}
                size={1.5}
                className="text-gray-500 mr-4"
              />
              <div>
                <h3 className="text-lg font-medium">Full Name</h3>
                <p className="text-sm">
                  {user.firstName} {user.lastName}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <Icon
                path={mdiEmail}
                size={1.5}
                className="text-gray-500 mr-4"
              />
              <div>
                <h3 className="text-lg font-medium">Email</h3>
                <p className="text-sm">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Icon
                path={mdiCalendar}
                size={1.5}
                className="text-gray-500 mr-4"
              />
              <div>
                <h3 className="text-lg font-medium">Join Date</h3>
                <p className="text-sm">{user.createdAt}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default DashboardPage;
