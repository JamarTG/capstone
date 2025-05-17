import { UserData } from "@/types/user";
import { axiosInstanceWithCredentials } from "./axios";
import { handleRequest } from "./request";

export const UserAPI = {
  fetchUserInfo: () => handleRequest(axiosInstanceWithCredentials.get("/settings/user-info")),
  updateUserInfo: (userInfoPayload: Record<string, UserData[keyof UserData]>) =>
    handleRequest(axiosInstanceWithCredentials.put("/settings/user-info", userInfoPayload)),
};