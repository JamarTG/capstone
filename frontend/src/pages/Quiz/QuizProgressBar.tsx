import { useTheme } from "../../context/ThemeContext";

const QuizProgressBar = ({
  currentProgress,
  totalQuestions,
  progressPercentage,
}: {
  currentProgress: number;
  totalQuestions: number;
  progressPercentage: number;
}) => {
   const { isDark } = useTheme();

  return (
    <div className={`p-4 rounded-lg ${isDark ? "bg-gray-800" : "bg-white"}`}>
      <div className={`flex items-center justify-between text-sm mb-2 ${isDark ? "text-gray-300" : "text-slate-600"}`}>
        <span className="text-md">
          Question {currentProgress} of {totalQuestions}
        </span>
        <span className="text-md">
          {Math.round(progressPercentage)}% Complete
        </span>
      </div>
      <div className={`h-2 ${isDark ? "bg-gray-700" : "bg-slate-600/30"} rounded-full`}>
        <div
          className={`h-2 ${isDark ? "bg-green-500" : "bg-green-400"} rounded-full transition-all duration-500`}
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default QuizProgressBar;
