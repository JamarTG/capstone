import { Schema, Document, Types, model } from "mongoose";
import { IUser } from "./User";

export interface IFeedback extends Document {
  user: Types.ObjectId | IUser;
  section: string;
  feedback: string;
  created_at: Date;
}

const FeedbackSchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
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

export default model<IFeedback>("Feedback", FeedbackSchema);
