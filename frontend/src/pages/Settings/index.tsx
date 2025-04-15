import { useEffect, useState } from "react";
import PageContent from "../../components/layout/Page";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAuthRedirect from "../../hook/useAuthRedirect";
import { UserAPI } from "../../utils/api";
import PersonalInformation from "./PersonalInformation";
import ChangePassword from "./ChangePassword";
import Preferences from "./Preferences";
import { UserSettings } from "../../types/settings";
import toast from "react-hot-toast";
import { SuccessfulAuthResponse } from "../../types/auth";
import { AxiosError } from "axios";
import { extractErrorMessage } from "../../utils/error";

export default function SettingsPage() {
  useAuthRedirect();

  const [user, setUser] = useState<UserSettings>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    currentPassword: "",
    darkMode: false,
  });

  const { data } = useQuery({ queryKey: ["get-profile-data"], queryFn: UserAPI.fetchUserInfo });

  const onSuccess = ({ message }: SuccessfulAuthResponse) => {
    toast.success(message);
  };

  const onError = (error: AxiosError) => {
    toast.error(extractErrorMessage(error));
  };

  const { mutate } = useMutation({
    mutationFn: UserAPI.updateUserInfo,
    onSuccess,
    onError,
  });

  useEffect(() => {
    if (data) {
      setUser(data.data);
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const toggleDarkMode = () => {
    setUser((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const savePersonalInfo = () => {
    mutate({ firstName: user.firstName, lastName: user.lastName, email: user.email });
  };

  const savePassword = () => {
    mutate({ password: user.password, currentPassword: user.currentPassword });
  };

  return (
    <PageContent title="Settings">
      <div className="w-full flex flex-col gap-2 justify-center gap-3 rounded-xl">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-5 w-full justify-center">
          <PersonalInformation
            user={user}
            handleChange={handleChange}
            savePersonalInfo={savePersonalInfo}
          />
          <ChangePassword
            user={user}
            handleChange={handleChange}
            savePassword={savePassword}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2">
          <Preferences
            darkMode={user.darkMode}
            toggleDarkMode={toggleDarkMode}
          />
        </div>
      </div>
    </PageContent>
  );
}
