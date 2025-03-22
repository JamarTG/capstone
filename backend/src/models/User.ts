import mongoose from "mongoose";
import crypto from "crypto";
import { IUser } from "../types/model";

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String},
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();    
  this.salt = crypto.randomBytes(16).toString("hex");
  this.password = crypto
    .pbkdf2Sync(this.password, this.salt, 1000, 64, "sha512")
    .toString("hex");

  return next();
});

userSchema.methods.comparePassword = function (password: IUser["password"]): boolean {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
  return hash == this.password
};

export default mongoose.model<IUser>("User", userSchema);
