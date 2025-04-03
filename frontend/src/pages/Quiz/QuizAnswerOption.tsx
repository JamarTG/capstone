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
  return (
    <button
      onClick={() => onSelect(index)}
      className={`relative flex items-start p-4 rounded-lg border transition-all
          ${selectedAnswer === index ? "bg-blue-50 border-blue-300" : "bg-white border-gray-200 hover:border-gray-300"}
          hover:bg-gray-50`}
    >
      <div className="flex items-center h-5 mr-3 mt-0.5">
        <div
          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center
            ${selectedAnswer === index ? "border-blue-500 bg-blue-500" : "border-gray-300"}`}
        >
          {selectedAnswer === index && <div className="w-2 h-2 rounded-full bg-white" />}
        </div>
      </div>
      <span className="font-medium text-gray-700 text-left">{answer}</span>
    </button>
  );
};

export default QuizAnswerOption;