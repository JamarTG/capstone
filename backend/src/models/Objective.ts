import mongoose, { Schema, Types } from "mongoose";
import { IObjective } from "../types/model";

const ObjectiveSchema = new Schema<IObjective>({
  description: { type: String, required: true },
  topic: { 
    type: Schema.Types.ObjectId, 
    ref: 'Topic',
    required: true 
  }
}, { timestamps: true });

export const Objective = mongoose.model<IObjective>("Objective", ObjectiveSchema);