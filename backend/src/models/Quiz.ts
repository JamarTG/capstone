import { Schema, model, Document, Types } from "mongoose";
import { IQuestion } from "../types/model";

export interface IQuiz extends Document {
  section: number;
  user: Types.ObjectId;
  currentQuestionIndex: number;
  score: number;
  startTime: Date;
  endTime?: Date;
  completed: boolean;
  tags: string[];
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
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
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
        is_correct: {
          type: Boolean,
          default: null,
        }
      },
    ],
  },
  {
    timestamps: true,
  }
);

QuizSchema.index({ user: 1 });
QuizSchema.index({ topic: 1 });
QuizSchema.index({ completed: 1 });
QuizSchema.index({ score: 1 });

export const Quiz = model<IQuiz>("Quiz", QuizSchema);
