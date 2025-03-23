export interface IUser extends Document {
  email: string;
  password: string;
  firstName:string,
  lastName:string,
  salt: string;
  comparePassword: (password: IUser["password"]) => boolean;
  createdAt: Date;
}
