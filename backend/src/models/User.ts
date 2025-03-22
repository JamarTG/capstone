// User(id,email, password, firstName,lastName, joinedDate)
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Consider adding validators later
export default mongoose.model("User", userSchema);
