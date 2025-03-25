import axios from "axios";
import { FormFields } from "../types/auth";



// axios.defaults.withCredentials = true;

export const BASE_URL = "http://localhost:5000/api";

const registerUser = async (userData: FormFields) => {
  const { data } = await axios.post(`${BASE_URL}/auth/register`, userData);
  return data;
};

const loginUser = async (userData: FormFields) => {
  const { data } = await axios.post(`${BASE_URL}/auth/login`, userData);
  return data;
};

export const checkAuth = async () => {
  const { data } = await axios.get(`${BASE_URL}/auth/check-auth`);
  return data;
};

const fetchUserInformation = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/settings/user-info`);
    console.log("Full response:", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { registerUser, loginUser,fetchUserInformation };
