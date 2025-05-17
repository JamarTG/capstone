import { Question } from "@/types/quiz";

export const getPageTotalPages = (questions: Question[], pageSize: number) => {
  return Math.ceil(questions.length / pageSize);
};

export const getPageQuestions = (
  questions: Question[],
  pageSize: number,
  page: number,
) => {
  const start = page * pageSize;
  const end = start + pageSize;
  return questions.slice(start, end);
};

export const calculateStart = (pageSize: number, page: number) =>
  pageSize * page;
