import { useTheme } from "../../hooks/useTheme";
import { OnSelectFn } from "../../types/functions";

interface QuizAnswerOptionProps {
  answer: string;
  index: number;
  selectedAnswer: number | null;
  onSelect: OnSelectFn;
}


const mapping:Record<number,string> = {
  0: "A. ",
  1: "B. ",
  2: "C. ",
  3: "D. ",
};

const QuizAnswerOption: React.FC<QuizAnswerOptionProps> = ({ answer, index, selectedAnswer, onSelect }) => {
  const { isDark } = useTheme();

  const setSelectedAnswer = () => onSelect(index);

  return (
    <button
      onClick={setSelectedAnswer}
      className={`relative flex items-start p-4 rounded-lg border transition-all
          ${
            selectedAnswer === index
              ? "border-blue-300"
              : isDark
                ? "bg-gray-800 border-gray-700 hover:border-gray-600 hover:bg-gray-700"
                : "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50"
          }`}
    >
      <div className="flex items-center h-5 mr-3 mt-0.5">
        <div
          className={`flex items-center justify-center
            ${selectedAnswer === index ? "border-blue-500 bg-blue-500" : "border-gray-300"}`}
        >
          {selectedAnswer === index && <div className="rounded-full bg-white" />}
        </div>
      </div>
      <span className={`font-medium text-left ${isDark ? "text-white" : "text-gray-700"}`}>{mapping[index]}{answer}</span>
    </button>
  );
};

export default QuizAnswerOption;
