import { jwtDecode } from "jwt-decode";
import { SuccessfulAuthResponse } from "../types/auth";

const setToken = (token: SuccessfulAuthResponse["token"]) => localStorage.setItem("token", token);
const getToken = (): SuccessfulAuthResponse["token"] | null => localStorage.getItem("token") || null;
const getUser = (token: SuccessfulAuthResponse["token"]) => (token ? jwtDecode(token) : null);
const logout = () => localStorage.removeItem("token");



export { setToken, getToken, getUser, logout };
