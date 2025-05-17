import type { Dispatch, FC, SetStateAction } from "react";
import { IconifyIcons } from "../../icons";
import { QuestionObject } from "./types";
import { Icon } from "@iconify/react";

export interface ReviewNavigationProps {
  currentQuestionIndex: number;
  setCurrentQuestionIndex: Dispatch<SetStateAction<number>>;
  questions: QuestionObject[];
}

const ReviewNavigation: FC<ReviewNavigationProps> = ({
  currentQuestionIndex,
  setCurrentQuestionIndex,
  questions,
}) => {
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
        className="px-4 py-2 bg-gray-700 rounded disabled:opacity-60 text-white flex justify-center items-center gap-2"
      >
        <Icon icon={IconifyIcons.chevronDoubleLeft} className="text-2xl" />
      </button>
      <button
        onClick={handleNext}
        disabled={currentQuestionIndex === questions.length - 1}
        className="px-4 py-2 bg-gray-700 rounded disabled:opacity-60 text-white"
      >
        <Icon icon={IconifyIcons.chevronDoubleRight} className="text-2xl" />
      </button>
    </div>
  );
};

export default ReviewNavigation;
