export interface Quiz {
  _id: string;
  user: string;
  currentQuestionIndex: number;
  score: number;
  startTime: Date;
  endTime?: Date;
  completed: boolean;
  section: number;
}

interface Session {
  _id: string;
  section: number;
  user: string;
  currentQuestionIndex: number;
  score: number;
  startTime: string;
  completed: boolean;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface QuizSessionResponse {
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
  _id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: "A" | "B" | "C" | "D";
  explanation: string;
  is_correct: boolean | null;
}
export interface Session {
  _id: string;
  topic: Topic;
  user: string;
  currentQuestionIndex: number;
  score: number;
  startTime: string;
  completed: boolean;
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
