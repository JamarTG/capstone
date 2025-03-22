export interface IUser extends Document {
  email: string;
  password: string;
  salt: string;
  comparePassword: (password: IUser["password"]) => boolean;
  createdAt: Date;
}
