import React from "react";

export interface ReviewNavigationProps {
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  questions: Array<{ question: string; options: string[] }>;
}

const ReviewNavigation: React.FC<ReviewNavigationProps> = ({  currentQuestionIndex, setCurrentQuestionIndex, questions }) => {
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="flex items-center gap-2 justify-between">
      <button
        onClick={handlePrevious}
        disabled={currentQuestionIndex === 0}
        className="px-4 py-2 bg-gray-700 rounded disabled:opacity-60 text-white"
      >
        Previous
      </button>
      <button
        onClick={handleNext}
        disabled={currentQuestionIndex === questions.length - 1}
        className="px-4 py-2 bg-gray-700 rounded disabled:opacity-60 text-white"
      >
        Next
      </button>
    </div>
  );
};

export default ReviewNavigation;
