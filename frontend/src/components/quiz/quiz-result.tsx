import { MdOutlineReviews } from "react-icons/md";
import Card from "../ui/card";
import { getTextWeaknessColor } from "../../utils/style";

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

const QuizCard: React.FC<QuizCardProps> = ({ score, lastAttempt }) => {
  return (
    <Card className={`${getTextWeaknessColor(score)}`}>
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
                className={`${getTextWeaknessColor(score)}`}
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
          <a className="text-slate-600 hover:text-slate-800 cursor-pointer flex justify-center items-start gap-1">
            <MdOutlineReviews size={30} />
            <p className="text-xl">Review</p>
          </a>
        </div>
      </div>
    </Card>
  );
};

export default QuizCard;
