import { useMutation, useQuery } from "@tanstack/react-query";
import PageContent from "../../components/layout/Page";
import useAuthRedirect from "@/hooks/useAuthRedirect";
import useSettingsUser from "@/hooks/useSettingsUser";
import ChangePersonalInfo from "./ChangePersonalInfo";
import ChangePassword from "./ChangePassword";
import { extractErrorMessage } from "@/utils";
import type { ChangeEvent } from "react";
import ChangeTheme from "./ChangeTheme";
import type { apiTypes } from "@/types";
import type { AxiosError } from "axios";
import { UserAPI } from "@/api/user";
import toast from "react-hot-toast";

export default function Settings() {
  useAuthRedirect();

  const { data } = useQuery({
    queryKey: ["get-profile-data"],
    queryFn: UserAPI.fetchUserInfo,
  });

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

  const { user, setUser } = useSettingsUser(data);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const savePersonalInfo = () => {
    mutate({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  };

  const savePassword = () => {
    mutate({ password: user.password, currentPassword: user.currentPassword });
  };

  const persInfoUpdatePayload = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };
  const passwordUpdatePayload = {
    password: user.password,
    currentPassword: user.currentPassword,
  };

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
