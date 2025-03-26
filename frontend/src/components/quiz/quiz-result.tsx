import { MdOutlineReviews } from "react-icons/md";
import Card from "../ui/card";

interface QuizCardProps {
  score: number;
  lastAttempt: string;
  tags: string[];
}

const QuizCard: React.FC<QuizCardProps> = ({ score, lastAttempt, tags }) => {
  return (
    <Card className="w-full max-w-sm bg-white rounded-xl shadow-lg overflow-hidden p-4">
      <div className="h-full w-full flex flex-col items-center gap-2">
        <div className="w-full flex justify-between items-center">
          <div className="bg-gray-100 hover:bg-gray-300 rounded-lg p-1 text-lg text-slate-600 flex justify-center items-center">
            {/* className="bg-slate-600 rounded-lg p-2 mr-10" */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="oklch(0.446 0.043 257.281)"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-file-text"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line
                x1="16"
                y1="13"
                x2="8"
                y2="13"
              ></line>
              <line
                x1="16"
                y1="17"
                x2="8"
                y2="17"
              ></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <button className="text-slate-600 text-sm  w-[100px] h-[30px] hover:text-slate-800 transition">Full Review</button>
          </div>
          <small className="text-gray-500">{lastAttempt}</small>

          <span className="text-2xl font-semibold text-slate-600">😁{score}%</span>
        </div>

        <div className="hidden md:flex lg:flex justify-center items-center text-sm h-full text-gray-700">
          <blockquote className="border-l-3 pl-2 text-gray-600">Excellent work! You have a strong grasp of the material!</blockquote>
        </div>

        {/* <div className="flex gap-2 flex-wrap justify-center mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-slate-600 bg-gray-100 px-2 rounded-full text-xs transition-transform transform hover:scale-105"
            >
              {tag}
            </span>
          ))}
        </div> */}
      </div>
    </Card>
  );
};

export default QuizCard;
