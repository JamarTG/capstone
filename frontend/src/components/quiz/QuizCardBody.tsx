import React from "react";
import { useNavigate } from "react-router-dom";
import { Section_Map } from "../../constants";

interface Props {
  section: number;
  formattedDate: string;
  score: number;
  completed: boolean;
  quizId: string;
  isDark: boolean;
  numberOfQuestions: number;
}

const QuizCardBody: React.FC<Props> = ({ section, formattedDate, score, completed, quizId, isDark, numberOfQuestions }) => {
  const navigate = useNavigate();

  const scorePercentage = Math.ceil((score / numberOfQuestions) * 100);

  return (
    <section className={`relative flex-1 p-4 flex flex-col justify-between ${isDark ? "text-gray-100" : "text-slate-800"}`}>
      {completed ? (
      <div className="flex items-center justify-end">
        <div className="text-xl font-bold mr-1">
        <span className={`${scorePercentage >= 70 ? "text-green-500" : scorePercentage >= 50 ? "text-yellow-500" : "text-red-500"}`}>
          {score}
        </span>
        <span className="text-gray-500">/{numberOfQuestions}</span>
        </div>
        <div className="text-gray-500 text-md">({scorePercentage}%)</div>
      </div>
      ) : (
      <div className="flex items-center justify-end">
        <span className="text-yellow-500 text-lg font-medium">In Progress</span>
      </div>
      )}
      <h3 className={`text-md break-all hyphens-auto ${isDark ? "text-gray-100" : "text-slate-600"}`}>{Section_Map[section]?.name}</h3>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-4">
      <small className={`text-sm ${isDark ? "text-gray-300" : "text-gray-500"}`}>{formattedDate}</small>

      <button
        className="text-sm text-blue-400"
        onClick={() => navigate(`/${completed ? "review" : "quiz"}/${quizId}`)}
      >
        {completed ? "Review" : "Continue"}
      </button>
      </div>
    </section>
  );
};

export default QuizCardBody;
