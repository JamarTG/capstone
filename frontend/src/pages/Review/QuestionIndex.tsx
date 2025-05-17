import type { Question } from "../../types/quiz";
import type { FC } from "react";

interface QuestionIndexProps {
  currentQuestionIndex: number;
  question: Question;
}

const QuestionIndex: FC<QuestionIndexProps> = ({
  currentQuestionIndex,
  question,
}) => {
  return (
    <h3 className="text-xl mb-4 h-16">
      Question {currentQuestionIndex + 1}: {question.question}
    </h3>
  );
};

export default QuestionIndex;
