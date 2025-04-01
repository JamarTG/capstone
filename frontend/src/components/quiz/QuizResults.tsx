import Card from "../ui/Card";
import { topics } from "../../data/sample/topics";

interface QuizCardProps {
  score: number;
  lastAttempt: string;
  topicIndex: number;
  tags: string[];
}

const QuizCard: React.FC<QuizCardProps> = ({ topicIndex, score, lastAttempt, tags }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500 text-emerald-800";
    if (score >= 50) return "bg-amber-500 text-amber-800";
    return "bg-red-500 text-red-800";
  };

  // const getEmoji = (score: number) => {
  //   if (score >= 80) return "🎯";
  //   if (score >= 50) return "👍";
  //   return "📌";
  // };

  return (
    <Card className="flex flex-col w-full h-64 max-w-sm bg-white rounded-xl shadow-lg overflow-hidden p-0 hover:shadow-xl transition-shadow duration-300 group">
      <section
        className="relative p-4 h-1/2"
        style={{
          backgroundImage: `url('${topics[topicIndex].backgroundImage}')`,
          backgroundSize: "cover",
        }}
      >
        <div className={`absolute top-3 right-3 flex justify-center items-center p-2 rounded-md`}>
          <span className="text-2xl text-white font-bold">{score}%</span>
        </div>

        <div className="flex justify-between items-start mt-2">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-white text-2xl">Score</h3>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className={`h-2 rounded-full ${getScoreColor(score).replace("text", "bg")}`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
      </section>

      <section className="h-1/2 absolute bottom-0 left-0 w-full p-4 pb-2 flex flex-col justify-center items-center">
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-3  cursor-pointer bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600 hover:bg-slate-50 hover:border-slate-200 hover:text-slate-700 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex w-full h-full justify-between items-end text-gray-400 gap-1">
          <small>{lastAttempt}</small>
          <button
            style={{ fontWeight: 300 }}
            className="cursor-pointer px-3 py-1 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition duration-300"
          >
            Full Review
          </button>
        </div>
      </section>
    </Card>
  );
};

export default QuizCard;
