import axios from "axios";
import type { LoginFormFields, RegisterFormFields } from "../types/form";
import type { UserData } from "../types/user";

export const BASE_URL = "http://localhost:5000/api";

const axiosInstanceWithCredentials = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// eslint-disable-next-line
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

export const UserAPI = {
  fetchUserInfo: () => handleRequest(axiosInstanceWithCredentials.get("/settings/user-info")),
  updateUserInfo: (userInfoPayload: Record<string, UserData[keyof UserData]>) =>
    handleRequest(axiosInstanceWithCredentials.put("/settings/user-info", userInfoPayload)),
};

export const QuizAPI = {
  createQuiz: (createQuizPayload: { section: number }) =>
    handleRequest(axiosInstanceWithCredentials.post("/quiz/create", createQuizPayload)),
  getTopics: () => handleRequest(axiosInstanceWithCredentials.get("/topics")),
  getQuizzes: () => handleRequest(axiosInstanceWithCredentials.get("/quiz/all")),
  deleteQuiz: (quizId: string) => handleRequest(axiosInstanceWithCredentials.delete(`/quiz/${quizId}`)),
  getQuizById: (quizId: string) => handleRequest(axiosInstanceWithCredentials.get(`/quiz/${quizId}`)),
  submitAnswer: (submitAnswerPayload: { quiz: string; selectedOption: string; question: string; score: number; is_correct: boolean }) =>
    handleRequest(axiosInstanceWithCredentials.patch(`/quiz/${submitAnswerPayload.quiz}/answer`, submitAnswerPayload)),
  autoSubmit: (quizId: string) => handleRequest(axiosInstanceWithCredentials.put(`/quiz/${quizId}/auto-submit`)),
  checkActiveSession: () => {
    return handleRequest(axiosInstanceWithCredentials.get("/quiz/active"));
  },
  getUserFeedbacks: () => handleRequest(axiosInstanceWithCredentials.get("/quiz/feedbacks")),
};
