import { Question } from "../../types/quiz";

interface QuestionIndexProps {
  currentQuestionIndex: number;
  question: Question;
}

const QuestionIndex: React.FC<QuestionIndexProps> = ({ currentQuestionIndex, question }) => {
  return (
    <h3 className="text-xl mb-4 h-16">
      Question {currentQuestionIndex + 1}: {question.question}
    </h3>
  );
};

export default QuestionIndex;
