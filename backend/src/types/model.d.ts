
import { Document, Types } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  status: "active" | "inactive";
  salt: string;
  comparePassword: (password: IUser["password"]) => boolean;
  createdAt: Date;
}

export interface IFeedback extends Document {
  user: Types.ObjectId | IUser;
  section: string;
  feedback: string;
  created_at: Date;
}

export interface IQuizQuestion {
  question: string;
  options: {
    [key: string]: string; 
  };
  answer: string;
  userAnswer?: string;
}


export interface ITopic extends Document {
  _id: Types.ObjectId;
  name: string;
  description: string;
  backgroundImage: string;
}

export interface IObjective extends Document {
  _id: Types.ObjectId;
  description: string;
  topic: Types.ObjectId | ITopic;
  questions?: Types.ObjectId[];
}

export interface IQuestion extends Document {
  _id: Types.ObjectId;
  text: string;
  options: Record<string, string>;
  correctAnswer: string;
  explanation?: string;
  objective: Types.ObjectId | IObjective;
}

export interface IQuiz{
  _id: string,
  topic: string;
  user: string;
  currentQuestionIndex: number;
  score: number;
  startTime: Date;
  endTime?: Date;
  completed: boolean;
  tags: string[];
  questions: IQuizQuestion[];
}

