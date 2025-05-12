import { User } from "./context";

export interface SuccessfulAuthResponse {
  token: string;
  message: string;
  user: User;
}


export interface SuccessfulQuizResponse {
  message: string;
  session: {
    _id: string;
    topic: string;
    user: string;
    currentQuestionIndex: number;
    score: number;
    startTime: Date;
    completed: boolean;
  };
}

export interface UserUpdatePayload {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  currentPassword?: string;
  darkMode?: boolean;
}

interface CreateQuizPayload {
  section: number;
}
