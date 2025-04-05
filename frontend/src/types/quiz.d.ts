// interface Quiz {
//     topicIndex: number;
//     score: number;
//     tags: string[];
//     lastAttempt: string;
//     numOfQuestions: number;
// }

export interface Quiz {
  _id:string;
  topic: Topic;
  user: string;
  currentQuestionIndex: number;
  score: number;
  startTime: Date;
  endTime?: Date;
  completed: boolean;
  tags: string[];
}
