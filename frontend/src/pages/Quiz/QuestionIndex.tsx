import { Question } from "../../types/quiz";

const QuestionIndex = ({ currentQuestionIndex, question }: { currentQuestionIndex: number; question: Question }) => {
    return (
      <h3 className="text-xl mb-4 h-16">
        Question {currentQuestionIndex + 1}: {question.question}
      </h3>
    );
  };

export default QuestionIndex;