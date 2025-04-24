import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { QuizAPI } from "../../utils/api";
import { Question } from "../../types/quiz";
import PageLayout from "../../components/layout/Page";
import LoadingPage from "../../components/common/Loader";
import { useTheme } from "../../context/ThemeContext";
import { mdiRobotHappyOutline, mdiTrophyOutline } from "@mdi/js";
import Icon from "@mdi/react";

const QuestionSidebar = ({
  isDark,
  questions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
}: {
  questions: Question[];
  isDark: boolean;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [page, setPage] = useState(0);
  const pageSize = 6;
  const start = page * pageSize;
  const end = start + pageSize;
  const totalPages = Math.ceil(questions.length / pageSize);
  const pageQuestions = questions.slice(start, end);

  return (
    <div className={`w-full sm:w-1/4 lg:w-1/3 p-4 ${isDark ? "bg-gray-800" : ""} rounded-lg sticky top-16 h-full overflow-y-auto`}>
      <h2 className="text-xl text-white mb-6">Questions</h2>
      <ul className="space-y-4">
        {pageQuestions.map((question, index) => {
          const globalIndex = start + index;
          return (
            <li
              key={globalIndex}
              onClick={() => setCurrentQuestionIndex(globalIndex)}
              className={`border p-3 cursor-pointer rounded-lg transition-colors ${
                currentQuestionIndex === globalIndex
                  ? `border-white ${isDark ? "text-white bg-gray-700" : "text-gray-800 bg-gray-200"}`
                  : `${isDark ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300 text-gray-600 hover:bg-gray-100"}`
              }`}
            >
              <p
                className="truncate"
                title={question.question}
              >
                {globalIndex + 1}. {question.question}
              </p>
            </li>
          );
        })}
      </ul>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Prev
        </button>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={page >= totalPages - 1}
          className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const QuizReview = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-quizzes", id],
    queryFn: () => QuizAPI.getQuizById(id!),
  });

   const { isDark } = useTheme();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  if (isLoading) {
    return <LoadingPage text={"Loading Answers..."} />;
  }

  if (error) {
    return <div className="text-white">Error loading quiz data</div>;
  }

  const { session } = data || {};
  const questions = session?.questions || [];
  const question = questions[currentQuestionIndex];

  // Calculate score
  const totalScore = session?.score || 0;
  const totalQuestions = questions.length;
  const scorePercentage = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 90) return "Excellent!";
    if (percentage >= 80) return "Great job!";
    if (percentage >= 70) return "Good work!";
    if (percentage >= 60) return "Not bad!";
    if (percentage >= 50) return "Keep trying!";
    return "Room for improvement!";
  };

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
    <PageLayout title={"Quiz Review"}>
      <div className="flex flex-wrap space-x-8 gap-8">
        <QuestionSidebar
          isDark={isDark}
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
        />

        <div className="flex-1 p-8 rounded-lg border border-gray-200">
          <div className="flex flex-row-reverse gap-10 justify-between">
            <div className="flex items-center justify-between">
              <div className="flex space-x-4">
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
            </div>

            <div className="mt-4 p-4 rounded-lg border border-gray-200 flex items-center h-24">
              <div className="mr-4">
                <Icon
                  path={mdiTrophyOutline}
                  size={2}
                  className={`${scorePercentage >= 70 ? "text-yellow-500" : scorePercentage >= 50 ? "text-blue-500" : "text-gray-500"}`}
                />
              </div>
              <div>
                <div className="font-bold text-lg">{getScoreMessage(scorePercentage)}</div>
                <div className="flex items-center">
                  <div className="text-2xl font-bold mr-2">
                    <span
                      className={`${scorePercentage >= 70 ? "text-green-500" : scorePercentage >= 50 ? "text-yellow-500" : "text-red-500"}`}
                    >
                      {totalScore}
                    </span>
                    <span className="text-gray-500">/{totalQuestions}</span>
                  </div>
                  <div className="text-lg ml-2">({scorePercentage}%)</div>
                </div>
              </div>
            </div>
          </div>

          {question && (
            <div className="p-6 rounded-lg min-h-64">
              <h3 className="text-xl mb-4 h-16">
                Question {currentQuestionIndex + 1}: {question.question}
              </h3>

              <ul className="space-y-3">
                {["A", "B", "C", "D"].map((key) => {
                  const option = question[`option_${key.toLowerCase()}`];
                  const isCorrect = question.correct_answer === key;
                  const isSelected = question.user_answer === key;
                  const gotItRight = isCorrect && isSelected;
                  const gotItWrong = !isCorrect && isSelected;

                  return (
                    <li
                      key={key}
                      className={`p-3 border rounded-lg ${
                        gotItRight
                          ? isDark
                            ? "border-green-400 bg-green-900 text-white"
                            : "border-green-500 bg-green-50"
                          : gotItWrong
                            ? isDark
                              ? "border-red-400 bg-red-900 text-white"
                              : "border-red-500 bg-red-50"
                            : isCorrect && !question.user_answer
                              ? isDark
                                ? "border-yellow-300 bg-yellow-900 text-white"
                                : "border-yellow-500 bg-yellow-50"
                              : isCorrect
                                ? isDark
                                  ? "border-green-300 bg-green-800 text-white"
                                  : "border-green-300 bg-green-50"
                                : isDark
                                  ? "border-gray-600 bg-gray-800 text-gray-300"
                                  : "border-gray-300 bg-white text-gray-700"
                      }`}
                    >
                      {key}. {option}
                      {gotItRight && " ✅"}
                      {gotItWrong && " ❌"}
                      {!isSelected && isCorrect && question.user_answer && " (Correct Answer)"}
                      {!question.user_answer && isCorrect && " (Unanswered)"}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-6 h-32">
                {question && question.explanation ? (
                  <div className="flex flex-col gap-2 h-full">
                    <h4 className={`font-bold flex gap-2 items-center text-sm ${isDark ? "text-blue-300" : "text-blue-800"}`}>
                      <Icon
                        path={mdiRobotHappyOutline}
                        size={0.9}
                      />
                      AI Explanation
                    </h4>
                    <p className={`text-md leading-snug overflow-y-auto ${isDark ? "text-gray-200" : "text-slate-600"}`}>
                      {question.explanation}
                    </p>
                  </div>
                ) : (
                  <div
                    className={`px-3 py-2 rounded h-full flex items-center justify-center border-l-4 ${
                      isDark ? "bg-gray-700 border-gray-500 text-gray-300" : "bg-gray-50 border-gray-400 text-gray-800"
                    }`}
                  >
                    <p className="italic text-sm">{`No explanation available for this question.`}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default QuizReview;
