import { getWeaknessColor } from "../../utils";
import Button from "../ui/button";
import Card from "../ui/card";

interface QuizCardProps {
  score: number;
  lastAttempt: string;
  tags: string[];

}

const getScoreEmoji = (score: number) => {
  if (score >= 90) return "😢";
  if (score >= 75) return "😐";
  if (score >= 50) return "😊";
  return "😁";
};

const QuizCard: React.FC<QuizCardProps> = ({ score, lastAttempt}) => {
  return (
    <Card className={`${getWeaknessColor(score)}`}>
      <div className="relative w-full h-full transform rotate-y-0 transition-transform duration-500 hover:rotate-y-180"></div>
      <div className="p-2 flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <div className="relative">
            <svg className="w-20 h-20">
              <circle
                className={"text-slate-800"}
                strokeWidth="5"
                stroke="currentColor"
                fill="transparent"
                r="35"
                cx="40"
                cy="40"
              />
              <circle
                className={`text-${getWeaknessColor(score)}`}
                strokeWidth="6"
                strokeDasharray={`${score * 2.2}, 220`}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="35"
                cx="40"
                cy="40"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-semibold">{score}%</span>
            </div>
          </div>

          <div className="">
            <span className="text-3xl">{getScoreEmoji(score)}</span>
          </div>
        </div>

        <div className="mt-3 mx-3 border-t border-slate-200 pb-3 pt-2 px-1">
          <span className="text-sm text-slate-600 font-medium">Attempted {lastAttempt}</span>
        </div>

        <div className="flex justify-between mt-4">
          <Button variant="primary" className="text-white px-4 py-2 rounded">Review</Button>
          <Button variant="primary" className="text-white px-4 py-2 rounded">Retry</Button>
        </div>
      </div>
    </Card>
  );
};

export default QuizCard;
