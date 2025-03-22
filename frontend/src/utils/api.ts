import axios from "axios";
import { FormFields } from "../types/auth";

const BASE_URL = "http://localhost:5000/api";

const registerUser = async (userData: FormFields) => {
  const { data } = await axios.post(`${BASE_URL}/auth/register`, userData);
  return data;
};


export {registerUser}
