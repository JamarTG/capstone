import QuizCardHeader from "../../components/quiz/QuizCardHeader";
import QuizCardBody from "../../components/quiz/QuizCardBody";
import { useMutation, useQuery } from "@tanstack/react-query";
import { extractErrorMessage } from "@/utils";
import Card from "../../components/ui/Card";
import type { AxiosError } from "axios";
import { formatDate } from "@/utils";
import toast from "react-hot-toast";
import type { Quiz } from "./types";
import { useTheme } from "@/hooks";
import { useState } from "react";
import type { FC } from "react";
import { QuizAPI } from "@/api";

interface QuizCardProps {
  score: Quiz["score"];
  lastAttempt: Quiz["endTime"] | Quiz["startTime"];
  section: Quiz["section"];
  completed: Quiz["completed"];
  currentQuestionIndex: Quiz["currentQuestionIndex"];
  className?: string;
  quizId: Quiz["_id"];
  quizRefetch: ReturnType<typeof useQuery>["refetch"];
}

const QuizCard: FC<QuizCardProps> = ({
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
  const formattedDate = lastAttempt ? formatDate(lastAttempt) : "N/A";

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
        score={score}
        completed={completed}
        numberOfQuestions={currentQuestionIndex}
        quizId={quizId}
        isDark={isDark}
      />
    </Card>
  );
};

export default QuizCard;
