import React from "react";
import { useNavigate } from "react-router-dom";
import { Section_Map } from "../../constants";

interface Props {
  section: number;
  formattedDate: string;
  scorePercentage: number;
  completed: boolean;
  quizId: string;
  isDark: boolean;
}

const QuizCardBody: React.FC<Props> = ({
  section,
  formattedDate,
  scorePercentage,
  completed,
  quizId,
  isDark,
}) => {
  const navigate = useNavigate();

  return (
    <section className={`flex-1 p-4 flex flex-col justify-between ${isDark ? "text-gray-100" : "text-slate-800"}`}>
      <div className="flex justify-between items-start">
        <h3 className={`text-md drop-shadow-md ${isDark ? "text-gray-100" : "text-slate-600"}`}>
          {Section_Map[section]?.name}
        </h3>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-4">
        <small className={`text-sm ${isDark ? "text-gray-300" : "text-gray-500"}`}>{formattedDate}</small>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-semibold p-2 rounded-full">{scorePercentage}%</span>
        </div>
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
