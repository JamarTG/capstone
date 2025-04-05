import mongoose, { Schema, Types } from "mongoose";
import { ITopic } from "../types/model";

const TopicSchema = new Schema<ITopic>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  backgroundImage: { type: String, required: true },
}, {
  timestamps: true
});

const Topic = mongoose.model<ITopic>("Topic", TopicSchema);

export default Topic;