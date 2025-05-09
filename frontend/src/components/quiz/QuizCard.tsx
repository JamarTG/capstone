import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { QuizAPI } from "../../utils/api";
import { useTheme } from "../../context/ThemeContext";
import Card from "../ui/Card";
import QuizCardHeader from "./QuizCardHeader";
import QuizCardBody from "./QuizCardBody";
import { extractErrorMessage } from "../../utils/error";
import toast from "react-hot-toast";
import { formatDate } from "../../utils/date";
import { AxiosError } from "axios";

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
  const formattedDate = formatDate(lastAttempt);

  const handleError = (error: AxiosError) => {
    toast.error(extractErrorMessage(error) || "Failed to delete quiz");
  };

  const { mutate, isPending } = useMutation({
    mutationFn: QuizAPI.deleteQuiz,
    onSuccess: quizRefetch,
    onError: handleError,
  });

  const handleQuizDelete = () => {
    mutate(quizId);
    setIsConfirming(false);
  };

  const confirmDeletion = () => setIsConfirming(true);
  const cancelDeletion = () => setIsConfirming(false);

  return (
    <Card
      className={`border ${isDark ? "border-gray-700" : "border-gray-200"} rounded-lg relative flex flex-col min-h-[16rem] sm:min-h-[18rem] ${isDark ? "bg-gray-800" : "bg-white"} overflow-hidden p-0 transition-all duration-300 group ${className}`}
      key={quizId}
    >
      <QuizCardHeader
        section={section}
        isConfirming={isConfirming}
        isPending={isPending}
        onConfirm={handleQuizDelete}
        onCancel={cancelDeletion}
        onDeleteClick={confirmDeletion}
      />
      <QuizCardBody
        section={section}
        formattedDate={formattedDate}
        score = {score}
        completed={completed}
        numberOfQuestions={currentQuestionIndex}
        quizId={quizId}
        isDark={isDark}
      />
    </Card>
  );
};

export default QuizCard;

