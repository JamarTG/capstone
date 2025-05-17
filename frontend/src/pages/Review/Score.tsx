import { IconifyIcons } from "../../icons";
import ScoreDisplay from "./ScoreDisplay";
import { Icon } from "@iconify/react";
import type { FC } from "react";

interface ScoreSectionProps {
  scorePercentage: number;
  totalScore: number;
  totalQuestions: number;
  isDark: boolean;
}

const ScoreSection: FC<ScoreSectionProps> = ({
  scorePercentage,
  totalScore,
  totalQuestions,
  isDark,
}) => {
  return (
    <div
      className={`gap-2 mt-4 p-4 rounded-lg border ${isDark ? "border-gray-600" : "border-gray-200"} flex items-center h-24`}
    >
      <Icon
        icon={IconifyIcons.trophy}
        className={`${scorePercentage >= 70 ? "text-yellow-500" : scorePercentage >= 50 ? "text-blue-500" : "text-gray-500"} text-4xl`}
      />
      <ScoreDisplay
        scorePercentage={scorePercentage}
        totalScore={totalScore}
        totalQuestions={totalQuestions}
      />
    </div>
  );
};

export default ScoreSection;
