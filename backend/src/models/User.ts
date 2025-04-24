import mongoose from "mongoose";
import crypto from "crypto";

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  status: "active" | "inactive";
  salt: string;
  comparePassword: (password: IUser["password"]) => boolean;
  createdAt: Date;
}

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  salt: { type: String },
  status : {type : String, enum: ["active", "inactive"], default: "active"},
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.salt = crypto.randomBytes(16).toString("hex");
  this.password = crypto.pbkdf2Sync(this.password, this.salt, 1000, 64, "sha512").toString("hex");

  return next();
});

userSchema.methods.comparePassword = function (password: IUser["password"]): boolean {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
  return hash == this.password;
};

export default mongoose.model<IUser>("User", userSchema);
