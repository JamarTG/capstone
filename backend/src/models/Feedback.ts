import mongoose, { Schema, Document } from "mongoose";
import { IFeedback } from "../types/model";

const FeedbackSchema: Schema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  section: {
    type: Number,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<IFeedback>("Feedback", FeedbackSchema);
