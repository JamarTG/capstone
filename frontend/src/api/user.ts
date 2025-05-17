import { axiosInstanceWithCredentials } from "./instance";
import { handleRequest } from "./request";
import { UserData } from "@/types/user";

export const UserAPI = {
  fetchUserInfo: () =>
    handleRequest(axiosInstanceWithCredentials.get("/settings/user-info")),
  updateUserInfo: (userInfoPayload: Record<string, UserData[keyof UserData]>) =>
    handleRequest(
      axiosInstanceWithCredentials.put("/settings/user-info", userInfoPayload),
    ),
};
