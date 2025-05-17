import { axiosInstanceWithCredentials } from "./axios";
import { handleRequest } from "./request";

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