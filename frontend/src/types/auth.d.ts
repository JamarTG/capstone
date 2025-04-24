export interface RegisterFormFields {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}

export interface LoginFormFields {
  email?: string;
  password?: string;
}

export interface RegisterFormErrors extends RegisterFormFields {}

export interface LoginFormErrors extends LoginFormFields {}

export interface SuccessfulAuthResponse {
  token: string;
  message: string;
  user: any;
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
