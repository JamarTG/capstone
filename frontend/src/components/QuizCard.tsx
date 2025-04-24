import Card from "./ui/Card";
import Icon from "@mdi/react";
import { mdiTrashCanOutline } from "@mdi/js";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { QuizAPI } from "../utils/api";
import { AxiosError } from "axios";
import { extractErrorMessage } from "../utils/error";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Section_Map } from "../constants";
import { useState } from "react";
import React from "react";

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
  className = "",
  quizId,
  currentQuestionIndex,
}) => {
  const [isConfirming, setIsConfirming] = useState(false);
   const { isDark } = useTheme();

  const onError = (error: AxiosError) => {
    toast.error(extractErrorMessage(error) || "Failed to delete quiz");
  };

  const { mutate, isPending } = useMutation({
    mutationFn: QuizAPI.deleteQuiz,
    onSuccess: quizRefetch,
    onError,
  });

  const formattedDate = new Date(lastAttempt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleQuizDelete = () => {
    mutate(quizId);
    setIsConfirming(false);
  };

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Card
        className={`border ${isDark ? "border-gray-700" : "border-gray-200"} rounded-lg relative flex flex-col min-h-[16rem] sm:min-h-[18rem] ${isDark ? "bg-gray-800" : "bg-white"} overflow-hidden p-0 transition-all duration-300 group ${className}`}
        key={quizId}
      >
        <section
          className="relative h-32 sm:h-32"
          style={{
            backgroundImage: `url(${Section_Map[section]?.bgSrc})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          {!isConfirming && (
            <button
              onClick={() => setIsConfirming(true)}
              disabled={isPending}
              className={`cursor-pointer absolute top-3 left-3 z-10 text-white bg-black/30 hover:bg-black/50 p-1.5 rounded-full`}
              title="Delete quiz"
            >
              <Icon
                path={mdiTrashCanOutline}
                className="w-6 h-6"
              />
            </button>
          )}

      
          {isConfirming && (
            <div className="absolute inset-0 flex justify-center items-center z-20">
              <div className="p-4 rounded-lg shadow-lg text-center">
                <h2 className="text-lg font-semibold mb-4">Are you sure you want to delete this quiz?</h2>
                <div className="flex justify-center gap-4">
                  <button
                    className="text-gray-600"
                    onClick={() => setIsConfirming(false)}
                    disabled={isPending}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-red-600"
                    onClick={handleQuizDelete}
                    disabled={isPending}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        <section className={`flex-1 p-4 flex flex-col justify-between ${isDark ? "text-gray-100" : "text-slate-800"}`}>
          <div className="flex justify-between items-start">
            <h3 className={`text-md drop-shadow-md ${isDark ? "text-gray-100" : "text-slate-600"}`}>{Section_Map[section].name}</h3>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-4">
            <small className={`text-sm ${isDark ? "text-gray-300" : "text-gray-500"}`}>{formattedDate}</small>
            <div className="flex items-center gap-2">
              <span className={`text-2xl font-semibold p-2 rounded-full`}>{Math.ceil((score / currentQuestionIndex) * 100)}%</span>
            </div>
            <button
              className="text-sm text-blue-400"
              onClick={() => navigate(`/${completed ? "review" : "quiz"}/${quizId}`)}
            >
              {completed ? "Review" : "Continue"}
            </button>
          </div>
        </section>
      </Card>
    </React.Fragment>
  );
};

export default QuizCard;
