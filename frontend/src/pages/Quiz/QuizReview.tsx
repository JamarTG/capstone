import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { QuizAPI } from "../../utils/api";
import { Question } from "../../types/quiz";
import PageLayout from "../../components/layout/Page";
import reviewBg from "../../assets/images/quiz/code.webp";

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
    <div className="w-2/5 p-4 border border-gray-200 rounded-xl sticky top-16 h-full">
      <h2 className="text-lg font-semibold mb-4">Questions</h2>
      <ul
        className="relative flex flex-col p-3 rounded-lg transition-all overflow-y-auto max-h-full"
        style={{ maxHeight: "calc(100vh - 120px)" }}
      >
        {questions.map((question, index) => (
          <li
            key={index}
            onClick={() => setCurrentQuestionIndex(index)}
            className={`border border-gray-200 cursor-pointer p-2 rounded-lg mb-2 ${
              currentQuestionIndex === index ? "bg-gray-200 hover:bg-gray-300" : ""
            }`}
          >
            <p className="text-md text-slate-600">{question.questionId.text}</p>
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading quiz data</div>;
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
      <div className="flex space-x-8">
        <QuestionSidebar
          questions={session?.questions || []}
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
        />

        <div className="border text-gray-200 border-gray-200 max-w-5xl rounded-2xl flex flex-col flex-1 gap-3">
          <div
            className="w-full p-3"
            style={{ backgroundSize: "cover", backgroundImage: `url('${session.topic.backgroundImage}')` }}
          >
            <h1 className="text-xl opacity-100 text-gray-100 font-bold mb-4">{session?.topic.name} Quiz Review</h1>
            <div className="flex justify-between mb-4">
              <button
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-60"
              >
                Previous
              </button>
              <span>
                Question {currentQuestionIndex + 1} of {session?.questions.length}
              </span>
              <button
                onClick={handleNext}
                disabled={currentQuestionIndex === session?.questions.length - 1}
                className="px-4 py-2 bg-gray-300 rounded disabled:opacity-60"
              >
                Next
              </button>
            </div>
          </div>

          {question && (
            <div className="m-5 p-4 border border-gray-100 text-slate-600 rounded-xl">
              <h3 className="font-semibold text-lg">{question.questionId.text}</h3>

              <ul className="mt-2 space-y-1">
                {Object.entries(question.questionId.options).map(([key, option]) => {
                  const isSelected = question.selectedOption === key;
                  const isCorrect = question.questionId.correctAnswer === key;
                  return (
                    <li
                      key={key}
                      className={`p-2 rounded ${
                        isCorrect ? "bg-green-100 border border-green-400" : isSelected ? "bg-red-100 border border-red-400" : "bg-gray-100"
                      }`}
                    >
                      {key}. {option as string}
                      {isCorrect && " ✅"}
                      {isSelected && !isCorrect && " ❌"}
                    </li>
                  );
                })}
              </ul>
              <p className="mt-2 text-sm text-gray-600">{question.questionId.explanation}</p>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default QuizReview;
