import Cookies from "js-cookie";
import { SuccessfulAuthResponse } from "../types/auth";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";
import routes from "../data/routes";

const logout = () => {
  Cookies.remove("token", { path: "/" });
  localStorage.removeItem("user");
};

const handleSuccessfulRegistrationResponse = ({ token, message }: SuccessfulAuthResponse, navigate: NavigateFunction) => {
  toast.success(message);
  Cookies.set("token", token, { path: "/", expires: 7 });
  navigate(routes.home.path);
};

const handleUnsuccessfulAuthResponse = (error: AxiosError) => {
  const errorMessage = (error.response?.data as { message?: string })?.message ?? "An unexpected error occurred";
  toast.error(errorMessage);
};

const handleSuccessfulLoginResponse = ({ token, message }: SuccessfulAuthResponse, navigate: NavigateFunction) => {
  toast.success(message);
  Cookies.set("token", token, { path: "/", expires: 7 });
  navigate(routes.home.path);
};

const authHandlers = {
  handleSuccessfulLoginResponse,
  handleSuccessfulRegistrationResponse,
  handleUnsuccessfulAuthResponse,
};

export { logout, authHandlers };
