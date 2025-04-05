import { Schema, model, Document, Types } from "mongoose";

export interface IUserAnswer extends Document {
  user: Types.ObjectId;
  quiz: Types.ObjectId;
  question: Types.ObjectId;
  selectedOption: string;
  isCorrect: boolean;
  answeredAt: Date;
}

const UserAnswerSchema = new Schema<IUserAnswer>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quiz: {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },
    selectedOption: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
    answeredAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

UserAnswerSchema.index({ user: 1, quiz: 1, question: 1 }, { unique: true });

export const UserAnswer = model<IUserAnswer>("UserAnswer", UserAnswerSchema);
