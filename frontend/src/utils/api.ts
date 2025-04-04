import axios from "axios";
import { LoginFormFields, RegisterFormFields } from "../types/auth";

export const BASE_URL = "http://localhost:5000/api";

const axiosInstanceWithCredentials = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const handleRequest = async (request: Promise<any>) => {
  try {
    const { data } = await request;
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const AuthAPI = {
  register: (userData: RegisterFormFields) => handleRequest(axiosInstance.post("/auth/register", userData)),
  login: (userData: LoginFormFields) => handleRequest(axiosInstance.post("/auth/login", userData)),
  checkAuth: () => handleRequest(axiosInstanceWithCredentials.get("/auth/check-auth")),
};

interface UserUpdateInfo {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  currentPassword?: string;
  darkMode?: boolean;
}

export const UserAPI = {
  fetchUserInfo: () => handleRequest(axiosInstanceWithCredentials.get("/settings/user-info")),
  updateUserInfo: (userData: UserUpdateInfo) => handleRequest(axiosInstanceWithCredentials.put("/settings/user-info", userData)),
  deleteAccount: () => handleRequest(axiosInstanceWithCredentials.post('settings/delete-account', {})),
};
