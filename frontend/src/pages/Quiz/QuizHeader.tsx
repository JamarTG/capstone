import QuizProgressBar from "./QuizProgressBar";

interface QuizHeaderProps {
  currentIndex: number;
  totalQuestions: number;
  timeLeft?: string; 
}

const QuizHeader = ({ currentIndex, totalQuestions, timeLeft }: QuizHeaderProps) => {
  const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      <div className="relative h-64 border border-gray-200">
        <div className="relative z-10 h-full p-8 max-w-screen-xl mx-auto flex flex-col justify-between">
          <div className="flex justify-between items-start text-slate-800">
            <div className="space-y-3">
              <h1 className="text-xl font-bold tracking-tight">
                Web Development Fundamentals
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
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-green-500"
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
                  30 Minutes
                </span>
                {timeLeft && (
                  <span className="flex items-center gap-1 text-red-600">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6l4 2"
                      />
                    </svg>
                    Time Left: {timeLeft}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Settings"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </button>
              <button
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Help"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </button>
            </div>
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
