import { Icon } from "@iconify/react";
import Button from "../../components/ui/Button";
import { useTheme } from "../../context/ThemeContext";
import QuizProgressBar from "./QuizProgressBar";
import { IconifyIcons } from "../../icons";

interface QuizHeaderProps {
  currentIndex: number;
  totalQuestions: number;
  onSubmitQuiz: () => void;
  isSubmitting: boolean;
}

const QuizHeader = ({ currentIndex, totalQuestions, onSubmitQuiz }: QuizHeaderProps) => {
  const { isDark } = useTheme();

  const progressPercentage = (currentIndex / totalQuestions) * 100;

  return (
    <div className={`${isDark ? "bg-gray-800" : "bg-white"} rounded-lg overflow-hidden`}>
      <div className={`relative h-64 border ${isDark ? "border-gray-700" : "border-gray-200"}`}>
        <div className="relative z-10 h-full p-8 max-w-screen-xl mx-auto flex flex-col justify-between">
          <div className={`flex justify-between items-start ${isDark ? "text-gray-100" : "text-slate-800"}`}>
            <div className="space-y-3">
              <h1 className="text-2xl tracking-tight">Web Development Fundamentals</h1>
              <div className={`flex items-center space-x-6 text-sm font-medium ${isDark ? "text-gray-300" : "text-slate-600"}`}>
                <span className="flex items-center gap-1">
                  <svg
                    className={`w-4 h-4 ${isDark ? "text-blue-400" : "text-blue-500"}`}
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

            <Button
              onClick={onSubmitQuiz}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                isDark
                  ? "bg-red-400 text-white hover:bg-red-700 border border-transparent"
                  : "bg-red-400 text-white hover:bg-red-700 border border-transparent"
              }`}
            >
              <Icon icon={IconifyIcons.stop} />
              End
            </Button>
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
