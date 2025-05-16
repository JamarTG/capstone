import { Schema, model } from "mongoose";
import { randomBytes, pbkdf2Sync } from "crypto";

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

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  salt: { type: String },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  createdAt: { type: Date, default: Date.now },
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.salt = randomBytes(16).toString("hex");
  this.password = pbkdf2Sync(this.password, this.salt, 1000, 64, "sha512").toString("hex");

  return next();
});

userSchema.methods.comparePassword = function (password: IUser["password"]): boolean {
  const hash = pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
  return hash == this.password;
};

export default model<IUser>("User", userSchema);
