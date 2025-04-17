import QuizProgressBar from "./QuizProgressBar";

interface QuizHeaderProps {
  currentIndex: number;
  totalQuestions: number;
  onSubmitQuiz: () => void; 
  isSubmitting: boolean;
}

const QuizHeader = ({ currentIndex, totalQuestions, onSubmitQuiz, isSubmitting}: QuizHeaderProps) => {
  const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="relative h-64 border border-gray-200">
        <div className="relative z-10 h-full p-8 max-w-screen-xl mx-auto flex flex-col justify-between">
          <div className="flex justify-between items-start text-slate-800">
            <div className="space-y-3">
              <h1 className="text-xl font-bold tracking-tight">
                Web Development Fundamentals {isSubmitting}
              </h1>
              <div className="flex items-center space-x-6 text-sm text-slate-600 font-medium">
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {totalQuestions} Questions
                </span>
              </div>
            </div>

            <button
              onClick={() => onSubmitQuiz()}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              End Quiz
            </button>
          </div>

          <QuizProgressBar
            currentIndex={currentIndex}
            totalQuestions={totalQuestions}
            progressPercentage={progressPercentage}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizHeader;
