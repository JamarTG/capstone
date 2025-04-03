const QuizProgressBar = ({
  currentIndex,
  totalQuestions,
  progressPercentage,
}: {
  currentIndex: number;
  totalQuestions: number;
  progressPercentage: number;
}) => {
  return (
    <div className="p-4 rounded-lg">
      <div className="flex items-center justify-between text-slate-100 mb-2 text-sm">
        <span className="text-md text-slate-600">
          Question {currentIndex + 1} of {totalQuestions}
        </span>
        <span className="text-md text-slate-600">{Math.round(progressPercentage)}% Complete</span>
      </div>
      <div className="h-2 bg-slate-600/30 rounded-full">
        <div
          className="h-2 bg-green-400 rounded-full transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};


export default QuizProgressBar;