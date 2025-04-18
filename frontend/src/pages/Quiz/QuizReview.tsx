import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { QuizAPI } from "../../utils/api";
import { Question } from "../../types/quiz";
import PageLayout from "../../components/layout/Page";
import LoadingPage from "../../components/common/Loader";

const QuestionSidebar = ({
  questions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
}: {
  questions: Question[];
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="w-full sm:w-1/4 lg:w-1/3 p-4 bg-gray-800 rounded-lg sticky top-16 h-full overflow-y-auto">
      <h2 className="text-xl font-semibold text-white mb-6">Questions</h2>
      <ul className="space-y-4">
        {questions.map((question, index) => (
          <li
            key={index}
            onClick={() => setCurrentQuestionIndex(index)}
            className={`p-3 cursor-pointer rounded-lg transition-colors ${
              currentQuestionIndex === index
                ? "bg-gray-700 text-white"
                : "bg-gray-600 text-gray-300 hover:bg-gray-500"
            }`}
          >
            <p className="truncate">{question.questionId.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const QuizReview = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-quizzes", id],
    queryFn: () => QuizAPI.getQuizById(id!),
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  if (isLoading) {
    return <LoadingPage text={"Loading Answers..."} />;
  }

  if (error) {
    return <div className="text-white">Error loading quiz data</div>;
  }

  const { session } = data || {};

  const handleNext = () => {
    if (currentQuestionIndex < session?.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const question = session?.questions[currentQuestionIndex];

  return (
    <PageLayout title={"Quiz Review"}>
      <div className="flex flex-wrap space-x-8 gap-8">
        <QuestionSidebar
          questions={session?.questions || []}
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
        />

        <div className="flex-1 p-8 rounded-lg border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold text-white">
              {session?.topic.name} Review
            </h1>
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
                disabled={currentQuestionIndex === session?.questions.length - 1}
                className="px-4 py-2 bg-gray-700 rounded disabled:opacity-60 text-white"
              >
                Next
              </button>
            </div>
          </div>

          {question && (
            <div className="p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">
                {question.questionId.text}
              </h3>

              <ul className="space-y-3">
                {Object.entries(question.questionId.options).map(([key, option]) => {
                  const isSelected = question.selectedOption === key;
                  const isCorrect = question.questionId.correctAnswer === key;
                  return (
                    <li
                      key={key}
                      className={`p-3 rounded-lg ${
                        isCorrect
                          ? " border border-green-500 text-white"
                          : isSelected
                          ? "bg-red-600 border border-red-500 text-white"
                          : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {key}. {option as string}
                      {isCorrect && " ✅"}
                      {isSelected && !isCorrect && " ❌"}
                    </li>
                  );
                })}
              </ul>
              <p className="mt-4 text-gray-400">{question.questionId.explanation}</p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default QuizReview;
