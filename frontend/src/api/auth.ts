import { axiosInstance, axiosInstanceWithCredentials } from "./axios";
import { handleRequest } from "./request";
import { formTypes } from "@/types";

export const AuthAPI = {
  register: (userData: formTypes.RegisterFormFields) =>
    handleRequest(axiosInstance.post("/auth/register", userData)),
  login: (userData: formTypes.LoginFormFields) =>
    handleRequest(axiosInstance.post("/auth/login", userData)),
  checkAuth: () =>
    handleRequest(axiosInstanceWithCredentials.get("/auth/check-auth")),
};
