import type { FC } from "react";
import { getScoreMessage } from "../../utils/score";

export interface ScoreDisplayProps {
  scorePercentage: number;
  totalScore: number;
  totalQuestions: number;
}

const ScoreDisplay: FC<ScoreDisplayProps> = ({ scorePercentage, totalQuestions, totalScore }) => {
  return (
    <>
      <div className="font-bold text-lg">{getScoreMessage(scorePercentage)}</div>
      <div className="flex items-center">
        <div className="text-2xl font-bold mr-2">
          <span className={`${scorePercentage >= 70 ? "text-green-500" : scorePercentage >= 50 ? "text-yellow-500" : "text-red-500"}`}>
            {totalScore}
          </span>
          <span className="text-gray-500">/{totalQuestions}</span>
        </div>
        <div className="text-lg ml-2">({scorePercentage}%)</div>
      </div>
    </>
  );
};

export default ScoreDisplay;
