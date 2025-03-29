import Card from "../ui/card";

interface QuizCardProps {
  score: number;
  lastAttempt: string;
  tags: string[];
}

const QuizCard: React.FC<QuizCardProps> = ({ score, lastAttempt, tags }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-emerald-200 text-emerald-800';
    if (score >= 50) return 'bg-amber-200 text-amber-800';
    return 'bg-red-200 text-red-800';
  };

  const getEmoji = (score: number) => {
    if (score >= 80) return '🎯';
    if (score >= 50) return '👍';
    return '📌';
  };

  return (
    <Card className="w-full max-w-sm bg-white rounded-xl shadow-lg overflow-hidden p-0 hover:shadow-xl transition-shadow duration-300 group">

      <div className="p-5">
        <div className={`absolute top-3 right-3 flex justify-center items-center p-2 rounded-md`}>
          <span className="text-xl text-slate-600 font-bold"> {score}%</span>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <h3 className="font-bold text-gray-500">{lastAttempt}</h3>
            </div>
        
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getScoreColor(score).replace('text', 'bg')}`}
              style={{ width: `${score}%` }}
            ></div>
          </div>


          <div className="text-center px-4 py-2 rounded-lg border border-gray-100">
            {score >= 80 ? (
              <p className="text-slate-700 font-medium">You've mastered this material!</p>
            ) : score >= 50 ? (
              <p className="text-slate-700 font-medium">Review these topics to improve.</p>
            ) : (
              <p className="text-slate-700 font-medium">Let's review these concepts together.</p>
            )}
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2  bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600 hover:bg-slate-50 hover:border-slate-200 hover:text-slate-700 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

          <button className="mt-2 w-full py-2 text-slate-600 rounded-lg font-medium hover:from-slate-600 hover:to-purple-700 transition-all transform cursor-pointer  active:translate-y-0">
            Full Review
          </button>
        </div>
      </div>
    </Card>
  );
};

export default QuizCard;