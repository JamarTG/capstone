export interface Quiz {
  _id: string;
  user: string;
  currentQuestionIndex: number;
  score: number;
  startTime: Date;
  endTime?: Date;
  completed: boolean;
  section: number;
}

export interface FilterSetters {
  toAll: VoidFunction;
  toCompleted: VoidFunction;
  toIncompleted: VoidFunction;
}


export type ScoreRange = "0-49" | "50-79" | "80-100";
export type StatusFilter = "all" | "completed" | "incomplete";