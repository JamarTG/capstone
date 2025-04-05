import mongoose, { Schema } from "mongoose";
import { ITopic } from "../types/model";

const topicSchema = new Schema<ITopic>({
    name: { type: String, required: true },
    description: { type: String },
    backgroundImage: { type: String },
    objectives: [{ type: String }],
  });
  
  const Topic = mongoose.model<ITopic>("Topic", topicSchema);
  
  export default Topic;