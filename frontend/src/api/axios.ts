import axios from "axios";

export const BASE_URL = "http://localhost:5000/api";

export const axiosInstanceWithCredentials = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
