import RenderList from "../../components/common/RenderList";
import { useTheme } from "../../context/ThemeContext";
import QuizAnswerOption from "./QuizAnswerOption";

interface QuizQuestionProps {
  question: string;
  answers: string[];
  selectedAnswer: number | null;
  onAnswerSelect: (index: number) => void;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
}

const QuizQuestion = ({ question, answers, selectedAnswer, onAnswerSelect, onNextQuestion, isLastQuestion }: QuizQuestionProps) => {
  const { isDark } = useTheme();

  const renderAnswer = (answer: string, index: number) => (
    <QuizAnswerOption
      key={index}
      answer={answer}
      index={index}
      selectedAnswer={selectedAnswer}
      onSelect={onAnswerSelect}
    />
  );
  
  return (
    <div className={`p-8 w-full rounded-lg border ${isDark ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"}`}>
      <div className="relative mb-4 pt-2">
        <h2 className={`text-sm font-medium uppercase tracking-wider text-center ${isDark ? "text-gray-300" : "text-black"}`}>
          {question}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <RenderList
          data={answers}
          renderFn={renderAnswer}
        />
      </div>

      <div className="flex justify-center">
        <button
          onClick={onNextQuestion}
          disabled={selectedAnswer === null}
          className={`px-6 py-2 rounded-lg transition-colors ${
            selectedAnswer === null
              ? isDark
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-slate-600 text-white hover:bg-slate-700"
          }`}
        >
          {isLastQuestion ? "Submit Quiz" : "Next Question"}
        </button>
      </div>
    </div>
  );
};

export default QuizQuestion;
