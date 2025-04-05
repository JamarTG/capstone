import Card from "../../components/ui/Card";

export interface Topic {
  _id: string;
  name: string;
  backgroundImage: string;
  objectives: string[];
}

interface QuizCardProps {
  score: number;
  lastAttempt: string | Date;
  topic: Topic;
  tags: string[];
  completed: boolean;
  className?: string;
}

const QuizCard: React.FC<QuizCardProps> = ({ topic, completed, score, lastAttempt, tags, className = "" }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500 text-emerald-800";
    if (score >= 50) return "bg-amber-500 text-amber-800";
    return "bg-red-500 text-red-800";
  };

  const formattedDate = new Date(lastAttempt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card
      className={`border border-gray-200 rounded-lg relative flex flex-col min-h-[16rem] sm:min-h-[18rem] bg-white overflow-hidden p-0 transition-all duration-300 group ${className}`}
    >
      <section
        className="relative h-40 sm:h-44"
        style={{
          backgroundImage: `url('${topic?.backgroundImage ?? "/fallback.jpg"}')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute top-3 right-3 flex justify-center items-center px-3 py-1 rounded-sm bg-black/20 backdrop-blur-sm">
          <span className="text-xl font-bold text-white">{score}%</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-white text-md drop-shadow-md">{topic?.name ?? "Untitled Topic"}</h3>
            </div>
          </div>

          <div className="w-full bg-gray-200/30 rounded-full h-2 mt-2">
            <div
              className={`h-2 rounded-full ${getScoreColor(score).replace("text", "bg")}`}
              style={{ width: `${score}%` }}
            ></div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="flex-1 p-4 flex flex-col justify-between">
        <div className="flex flex-wrap gap-2 justify-center">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 cursor-pointer bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600 hover:bg-slate-50 hover:border-slate-200 hover:text-slate-700 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mt-4 text-gray-500">
          <small className="text-sm whitespace-nowrap">{formattedDate}</small>
          <button className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-colors duration-200 text-white text-sm sm:text-md font-medium bg-slate-600 hover:bg-slate-700 cursor-pointer">
            {completed ? "Review" : "Continue"}
          </button>
        </div>
      </section>
    </Card>
  );
};

export default QuizCard;
