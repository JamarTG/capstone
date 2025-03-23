import axios from "axios";
import { FormFields } from "../types/auth";
import { getToken } from "./auth";

const BASE_URL = "http://localhost:5000/api";

const registerUser = async (userData: FormFields) => {
  const { data } = await axios.post(`${BASE_URL}/auth/register`, userData);
  return data;
};

const loginUser = async (userData: FormFields) => {
  const { data } = await axios.post(`${BASE_URL}/auth/login`, userData);
  return data;
};

const fetchUserInformation = async () => {
    try {
      const token = getToken();
      const response = await axios.get(`${BASE_URL}/settings/user-info`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Full response:", response);
      return response.data;
    } catch (error) {
    //   console.error("Request failed:", error.response?.data || error.message);
      throw error;
    }
  };
  

export { registerUser, loginUser, fetchUserInformation };
