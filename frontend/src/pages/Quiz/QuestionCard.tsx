import QuizAnswerOption from "./QuizAnswerOption";

const QuestionCard = ({
  question,
  answers,
  selectedAnswer,
  onAnswerSelect,
  onNextQuestion,
  isLastQuestion,
}: {
  question: string;
  answers: string[];
  selectedAnswer: number | null;
  onAnswerSelect: (index: number) => void;
  onNextQuestion: () => void;
  isLastQuestion: boolean;

}) => {
  return (
    <div className="p-8 w-full rounded-lg border border-gray-200">
      <div className="relative mb-4 pt-2">
        <h2 className="text-sm text-gray-500 font-medium uppercase tracking-wider text-center text-black">{question}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {answers.map((answer, index) => (
          <QuizAnswerOption
            key={index}
            answer={answer}
            index={index}
            selectedAnswer={selectedAnswer}
            onSelect={onAnswerSelect}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <button
          onClick={onNextQuestion}
          disabled={selectedAnswer === null}
          
          className={`px-6 py-2 rounded-lg transition-colors
              ${selectedAnswer === null ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-slate-600 text-white hover:bg-slate-700"}`}
        >
          {isLastQuestion ? "Submit Quiz" : "Next Question"}
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
