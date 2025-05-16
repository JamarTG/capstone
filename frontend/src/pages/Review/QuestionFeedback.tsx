import type { FC } from "react";
import type { Question } from "../../types/quiz";
import type { QuizOption, QuizOptionPostFix } from "./types";

interface QuestionFeedbackProps {
  question: Question & {user_answer: string };
  isDark: boolean;

}

const QuestionFeedback: FC<QuestionFeedbackProps> = ({question, isDark}) => {
  
  const quizOptions:QuizOption[] = ["A", "B", "C", "D"]; 
  
  return (
    <ul className="space-y-3">
      {quizOptions.map((key) => {
        const option = question[`option_${key.toLowerCase() as QuizOptionPostFix }`];
        const isCorrect = question.correct_answer === key;
        const isSelected = question.user_answer === key;
        const gotItRight = isCorrect && isSelected;
        const gotItWrong = !isCorrect && isSelected;

        return (
          <li
            key={key}
            className={`p-3 border rounded-lg ${
              gotItRight
                ? isDark
                  ? "border-green-400 bg-green-900 text-white"
                  : "border-green-500 bg-green-50"
                : gotItWrong
                  ? isDark
                    ? "border-red-400 bg-red-900 text-white"
                    : "border-red-500 bg-red-50"
                  : isCorrect && !question.user_answer
                    ? isDark
                      ? "border-yellow-300 bg-yellow-900 text-white"
                      : "border-yellow-500 bg-yellow-50"
                    : isCorrect
                      ? isDark
                        ? "border-green-300 bg-green-800 text-white"
                        : "border-green-300 bg-green-50"
                      : isDark
                        ? "border-gray-600 bg-gray-800 text-gray-300"
                        : "border-gray-300 bg-white text-gray-700"
            }`}
          >
            {key}. {option}
            {gotItRight && " ✅"}
            {gotItWrong && " ❌"}
            {!isSelected && isCorrect && question.user_answer && " (Correct Answer)"}
            {!question.user_answer && isCorrect && " (Unanswered)"}
          </li>
        );
      })}
    </ul>
  );
};

export default QuestionFeedback;
