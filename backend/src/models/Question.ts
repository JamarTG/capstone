import mongoose, { Schema} from "mongoose";
import { IQuestion} from "../types/model";


const QuestionSchema = new Schema<IQuestion>({
  text: { type: String, required: true },
  options: {
    type: Map,
    of: String,
    required: true
  },
  correctAnswer: { type: String, required: true },
  explanation: { type: String },
  objective: { 
    type: Schema.Types.ObjectId, 
    ref: 'Objective',
    required: true 
  }
}, { timestamps: true });

export const Question = mongoose.model<IQuestion>("Question", QuestionSchema);