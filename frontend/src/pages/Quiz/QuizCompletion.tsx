import { Icon } from "@mdi/react";
import { mdiTrophy } from "@mdi/js";
import { useTheme } from "../../context/ThemeContext";

const QuizCompletion = ({
  score,
  totalQuestions,
  onRestart,
}: {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const isPassed = score / totalQuestions >= 0.6;

  return (
    <div
      className={`rounded-lg p-8 max-w-md mx-auto mt-16 transition-all duration-300 ${
        isDark
          ? "text-white border border-slate-700 bg-slate-800"
          : "text-gray-700 border border-gray-200 bg-white"
      }`}
    >
      <div className="flex items-center justify-center mb-6">
        <div
          className={`p-4 rounded-full transition-colors duration-300 ${
            isPassed
              ? isDark
                ? "bg-green-600"
                : "bg-green-100"
              : isDark
              ? "bg-red-600"
              : "bg-red-100"
          }`}
        >
          <Icon
            path={mdiTrophy}
            size={3}
            className={`${
              isPassed
                ? isDark
                  ? "text-green-300"
                  : "text-green-600"
                : isDark
                ? "text-red-300"
                : "text-red-600"
            }`}
          />
        </div>
      </div>
      <h2 className="text-2xl  text-center mb-4">
        {isPassed ? "Congratulations!" : "Better Luck Next Time!"}
      </h2>
      <p className="text-center mb-6 text-lg">
        You scored{" "}
        <span
          className={`font-bold ${
            isPassed
              ? isDark
                ? "text-green-400"
                : "text-green-600"
              : isDark
              ? "text-red-400"
              : "text-red-600"
          }`}
        >
          {score}/{totalQuestions}
        </span>
      </p>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
        {isPassed
          ? "You passed the quiz! Keep it up."
          : "Don’t worry, try again to improve your score!"}
      </p>
      <button
        onClick={onRestart}
        className="w-full py-3 rounded-lg transition-colors duration-300 bg-slate-600 text-white hover:bg-slate-700"
      >
        {isPassed ? "Take Another Quiz" : "Retry Quiz"}
      </button>
    </div>
  );
};

export default QuizCompletion;
