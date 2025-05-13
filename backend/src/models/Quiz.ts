import { Schema, model, Document, Types } from "mongoose";

export interface IQuestion {
  _id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  explanation: string;
  correct_answer: "A" | "B" | "C" | "D";
  user_answer: "A" | "B" | "C" | "D"; 
  is_correct?: boolean;
  feedbackId?:string;
}

export interface IQuiz extends Document {
  section: number;
  user: Types.ObjectId;
  currentQuestionIndex: number;
  score: number;
  startTime: Date;
  endTime?: Date;
  completed: boolean;
  questions: IQuestion[];
}


const QuizSchema = new Schema<IQuiz>(
  {
    section: {
      type: Number,
      required: [true, "Topic reference is required"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    currentQuestionIndex: {
      type: Number,
      default: 0,
      min: 0,
    },
    score: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    startTime: {
      type: Date,
      default: Date.now,
    },
    endTime: {
      type: Date,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  
    questions: [
      {
        question: {
          type: String,
          required: true,
        },
        option_a: {
          type: String,
          required: true,
        },
        option_b: {
          type: String,
          required: true,
        },
        option_c: {
          type: String,
          required: true,
        },
        option_d: {
          type: String,
          required: true,
        },
        correct_answer: {
          type: String,
          required: true,
          enum: ["A", "B", "C", "D"],
        },
        explanation: {
          type: String,
          required: true,
        },
        user_answer: {
          type: String,
          enum: ["A", "B", "C", "D"],
        },
        is_correct: {
          type: Boolean,
          default: null,
        },
        feedbackId: {
          type: Schema.Types.ObjectId,
          ref: "Feedback",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Quiz = model<IQuiz>("Quiz", QuizSchema);
