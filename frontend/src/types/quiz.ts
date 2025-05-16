type MCQAnswer = "A" | "B" | "C" | "D";

export interface Question {
  _id: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_answer: MCQAnswer ;
  explanation: string;
  is_correct: boolean | null;
}
