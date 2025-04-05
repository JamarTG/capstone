import { Types } from "mongoose";

export const getQuestionsForTopic = (topic: Types.ObjectId) => {
  return [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctIndex: 2,
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctIndex: 1,
    },
  ];
};
