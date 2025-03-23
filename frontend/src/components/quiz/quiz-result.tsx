import { getWeaknessColor } from "../../utils";
import Button from "../ui/button";
import Card from "../ui/card";

interface QuizCardProps {
  score: number;
  lastAttempt: string;
  tags: string[];
}

const getScoreEmoji = (score: number) => {
  if (score >= 90) return "🎉";
  if (score >= 75) return "😊";
  if (score >= 50) return "😐";
  return "😢";
};

const QuizCard: React.FC<QuizCardProps> = ({ score, lastAttempt, tags }) => {
  return (
    <Card className={getWeaknessColor(score)} >
      <div className="relative w-full h-full transform rotate-y-0 transition-transform duration-500 hover:rotate-y-180"></div>
      <div className="p-2 flex flex-col">
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

          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag) => {
              return <span className="bg-gray-100 text-gray-600 text-md font-medium px-2.5 py-0.5 rounded-full">{tag}</span>;
            })}
          </div>

          <hr />
          <div className="">
            <span className="text-3xl">{getScoreEmoji(score)}</span>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <Button variant="primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-refresh-ccw"
            >
              <polyline points="1 4 1 10 7 10" />
              <polyline points="23 20 23 14 17 14" />
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
            </svg>
            Retry
          </Button>

          <Button variant="secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-file-text"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line
                x1="16"
                y1="13"
                x2="8"
                y2="13"
              />
              <line
                x1="16"
                y1="17"
                x2="8"
                y2="17"
              />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            Review
          </Button>
        </div>

        <div className="mt-3 mx-3 border-t border-slate-200 pb-3 pt-2 px-1">
          <span className="text-sm text-slate-600 font-medium">Attempted {lastAttempt}</span>
        </div>
      </div>
    </Card>
  );
};

export default QuizCard;
