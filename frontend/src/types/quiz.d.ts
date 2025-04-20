// interface Quiz {
//     topicIndex: number;
//     score: number;
//     tags: string[];
//     lastAttempt: string;
//     numOfQuestions: number;
// }

import { Objective } from "../components/QuizCard";

export interface Quiz {
  _id: string;
  user: string;
  currentQuestionIndex: number;
  score: number;
  startTime: Date;
  endTime?: Date;
  completed: boolean;
  tags: string[];
  section: number;
}

export interface QuizSessionResponse {
  message: string;
  session: Session;
}

export interface QuizAnswerPayload {
  quiz: string;
  selectedOption: string;
  question: string;
  score: number;
  is_correct: boolean;
}

export interface Question {
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: "A" | "B" | "C" | "D";
}
export interface Session {
  _id: string;
  topic: Topic;
  user: string;
  currentQuestionIndex: number;
  score: number;
  startTime: string;
  completed: boolean;
  tags: string[];
  questions: Question[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Question {
  questionId: QuestionDetails;
  selectedOption: string;
  isCorrect: boolean;
  _id: string;
  answeredAt: string;
}

export interface QuestionDetails {
  _id: string;
  text: string;
  options: Record<string, string>; // Keys like A, B, C, D
  correctAnswer: string;
  explanation: string;
  objective: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
