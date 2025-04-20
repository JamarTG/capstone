import Card from "./ui/Card";
import Icon from "@mdi/react";
import { mdiTrashCanOutline } from "@mdi/js";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { QuizAPI } from "../utils/api";
import { AxiosError } from "axios";
import { extractErrorMessage } from "../utils/error";
import Button from "./ui/Button";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Section_Map } from "../constants";

export interface Question {
  _id: string;
  text: string;
  options: {
    [key: string]: string;
  };
  correctAnswer: string;
  explanation?: string;
}

export interface Objective {
  _id: string;
  description: string;
  questions: Question[];
}

export interface Topic {
  _id: string;
  name: string;
  description: string;
  backgroundImage: string;
  objectives: Objective[];
}

interface QuizCardProps {
  score: number;
  lastAttempt: string | Date;
  section: number;
  tags: string[];
  completed: boolean;
  currentQuestionIndex: number;
  className?: string;
  quizId: string;
  quizRefetch: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({
  quizRefetch,
  section,
  completed,
  score,
  lastAttempt,
  tags,
  className = "",
  quizId,
  currentQuestionIndex,
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const onError = (error: AxiosError) => {
    toast.error(extractErrorMessage(error) || "Failed to delete quiz");
  };

  const { mutate, isPending } = useMutation({
    mutationFn: QuizAPI.deleteQuiz,
    onSuccess: quizRefetch,
    onError,
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500 text-emerald-800";
    if (score >= 50) return "bg-amber-500 text-amber-800";
    return "bg-red-500 text-red-800";
  };

  const formattedDate = new Date(lastAttempt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleQuizDelete = () => {
    if (window.confirm("Are you sure you want to delete this quiz?")) {
      mutate(quizId);
    }
  };

  const navigate = useNavigate();

  const progressPercentage = currentQuestionIndex > 0 ? (score / currentQuestionIndex) * 100 : 0;

  return (
    <Card
      className={`border ${isDark ? "border-gray-700" : "border-gray-200"} rounded-lg relative flex flex-col min-h-[16rem] sm:min-h-[18rem] ${isDark ? "bg-gray-800" : "bg-white"} overflow-hidden p-0 transition-all duration-300 group ${className}`}
      key={quizId}
    >
      <section
        className="relative h-40 sm:h-44"
        style={{
          backgroundImage: `url(${Section_Map[section]?.bgSrc})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {!isNaN(score) && completed && (
          <div
            className={`absolute top-3 right-3 flex justify-center items-center px-3 py-1 rounded-sm ${getScoreColor(progressPercentage)} z-10`}
          >
            <span className="text-xl text-white">{progressPercentage.toFixed(0)}%</span>
          </div>
        )}

        <button
          onClick={handleQuizDelete}
          disabled={isPending}
          className={`cursor-pointer absolute top-3 left-3 z-10 text-white bg-black/30 hover:bg-black/50 p-1.5 rounded-full`}
          title="Delete quiz"
        >
          <Icon
            path={mdiTrashCanOutline}
            className="w-6 h-6"
          />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <div className="w-full bg-gray-200/30 rounded-full h-2 mt-2">
            <div
              className={`h-2 rounded-full ${getScoreColor(progressPercentage).replace("text", "bg")}`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </section>

      <section className={`flex-1 p-4 flex flex-col justify-between ${isDark ? "text-gray-100" : "text-slate-800"}`}>
        <div className="flex justify-between items-start">
          <h3 className={`text-md drop-shadow-md ${isDark ? "text-gray-100" : "text-slate-600"}`}>{Section_Map[section].name}</h3>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`px-2 cursor-pointer ${isDark ? "bg-gray-700 text-gray-300" : "bg-white text-slate-600"} border ${isDark ? "border-gray-600" : "border-gray-200"} rounded-full text-xs font-medium hover:bg-slate-50 hover:border-slate-200 hover:text-slate-700 transition-colors`}
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-4">
          <small className={`text-sm ${isDark ? "text-gray-300" : "text-gray-500"}`}>{formattedDate}</small>
          <Button
            size="sm"
            className={`gap-1 ${isDark ? "bg-gray-700 text-gray-100" : "bg-slate-300"}`}
            onClick={() => navigate(`/${completed ? "review" : "quiz"}/${quizId}`)}
          >
            {completed ? "Review" : "Continue"}
          </Button>
        </div>
      </section>
    </Card>
  );
};

export default QuizCard;
