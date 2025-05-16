
export interface FilterSetters {
  toAll: VoidFunction;
  toCompleted: VoidFunction;
  toIncompleted: VoidFunction;
}


export type ScoreRange = "0-49" | "50-79" | "80-100";
export type StatusFilter = "all" | "completed" | "incomplete";