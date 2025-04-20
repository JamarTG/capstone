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
  const [page, setPage] = useState(0);
  const pageSize = 6;
  const start = page * pageSize;
  const end = start + pageSize;
  const totalPages = Math.ceil(questions.length / pageSize);
  const pageQuestions = questions.slice(start, end);

  return (
    <div className="w-full sm:w-1/4 lg:w-1/3 p-4 bg-gray-800 rounded-lg sticky top-16 h-full overflow-y-auto">
      <h2 className="text-xl font-semibold text-white mb-6">Questions</h2>
      <ul className="space-y-4">
        {pageQuestions.map((question, index) => {
          const globalIndex = start + index;
          return (
            <li
              key={globalIndex}
              onClick={() => setCurrentQuestionIndex(globalIndex)}
              className={`p-3 cursor-pointer rounded-lg transition-colors ${
                currentQuestionIndex === globalIndex
                  ? "bg-gray-700 text-white"
                  : "bg-gray-600 text-gray-300 hover:bg-gray-500"
              }`}
            >
              <p className="truncate">{question.question}</p>
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
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
        />

        <div className="flex-1 p-8 rounded-lg border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl font-semibold text-white">Quiz Review</h1>
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

          {question && (
            <div className="p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-white mb-4">{question.question}</h3>

              <ul className="space-y-3">
                {["A", "B", "C", "D"].map((key) => {
                  const option = question[`option_${key.toLowerCase()}`];
                  const isCorrect = question.correct_answer === key;
                  const isSelected = question.user_answer === key;

                  return (
                    <li
                      key={key}
                      className={`p-3 rounded-lg ${
                        isCorrect
                          ? "border border-green-500 text-white"
                          : isSelected
                            ? "border border-red-500 text-white"
                            : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {key}. {option}
                      {isCorrect && " ✅"}
                      {isSelected && !isCorrect && " ❌"}
                    </li>
                  );
                })}
              </ul>

              {question.explanation && <p className="mt-4 text-gray-400">{question.explanation}</p>}
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default QuizReview;
