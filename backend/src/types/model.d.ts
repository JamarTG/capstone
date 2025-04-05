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

export interface IQuiz extends Document {
  topic: Types.ObjectId;
  user: Types.ObjectId;
  currentQuestionIndex: number;
  score: number;
  startTime: Date;
  endTime?: Date;
  completed: boolean;
  tags: string[];
}

export interface ITopic extends Document {
  name: string;
  description: string;
  backgroundImage: string;
  objectives: string[];
}
