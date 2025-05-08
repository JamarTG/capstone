import { useTheme } from "../../context/ThemeContext";

const QuizAnswerOption = ({
  answer,
  index,
  selectedAnswer,
  onSelect,
}: {
  answer: string;
  index: number;
  selectedAnswer: number | null;
  onSelect: (index: number) => void;
}) => {
  const { isDark } = useTheme();

  const setSelectedAnswer = () => onSelect(index);

  return (
    <button
      onClick={setSelectedAnswer}
      className={`relative flex items-start p-4 rounded-lg border transition-all
          ${selectedAnswer === index 
            ? "border-blue-300"  
            : isDark 
            ? "bg-gray-800 border-gray-700 hover:border-gray-600 hover:bg-gray-700" 
            : "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50" 
          }`}
    >
      <div className="flex items-center h-5 mr-3 mt-0.5">
        <div
          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
            ${selectedAnswer === index
              ? "border-blue-500 bg-blue-500"  
              : "border-gray-300"}`}
        >
          {selectedAnswer === index && <div className="w-2 h-2 rounded-full bg-white" />}
        </div>
      </div>
      <span className={`font-medium text-left ${isDark ? "text-white" : "text-gray-700"}`}>
        {answer}
      </span>
    </button>
  );
};

export default QuizAnswerOption;

