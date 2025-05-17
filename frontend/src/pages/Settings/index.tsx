import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
import PageContent from "../../components/layout/Page";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import { UserAPI } from "@/api/user";
import ChangePassword from "./ChangePassword";
import ChangeTheme from "./ChangeTheme";
import { UserSettings } from "./types";
import toast from "react-hot-toast";
import type { apiTypes } from "@/types";
import type { AxiosError } from "axios";
import extractErrorMessage from "../../utils/extractErrorMessage";
import { useTheme } from "@/hooks";
import ChangePersonalInfo from "./ChangePersonalInfo";

export default function Settings() {
  useAuthRedirect();
  const { isDark } = useTheme();

  const [user, setUser] = useState<UserSettings>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    currentPassword: "",
    darkMode: isDark,
  });

  const { data } = useQuery({ queryKey: ["get-profile-data"], queryFn: UserAPI.fetchUserInfo });

  const onSuccess = ({ message }: apiTypes.APISuccessResponse) => {
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const savePersonalInfo = () => {
    mutate({ firstName: user.firstName, lastName: user.lastName, email: user.email });
  };

  const savePassword = () => {
    mutate({ password: user.password, currentPassword: user.currentPassword });
  };

  const persInfoUpdatePayload = { firstName: user.firstName, lastName: user.lastName, email: user.email };
  const passwordUpdatePayload = { password: user.password, currentPassword: user.currentPassword };

  return (
    <PageContent title="Settings">
      <div className="w-full flex flex-col gap-2 justify-center gap-3 rounded-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full justify-center">
          <ChangePersonalInfo
            handleChange={handleChange}
            savePersonalInfo={savePersonalInfo}
            persInfoUpdatePayload={persInfoUpdatePayload}
          />
          <ChangePassword
            handleChange={handleChange}
            savePassword={savePassword}
            passwordUpdatePayload={passwordUpdatePayload}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <ChangeTheme darkMode={user.darkMode} />
        </div>
      </div>
    </PageContent>
  );
}
