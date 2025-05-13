import { Icon } from "@iconify/react";
import { Question } from "../../types/quiz";
import { IconifyIcons } from "../../icons";

interface ExplanationSectionProps {
 question: Question; 
 isDark: boolean 
}


const ExplanationSection:React.FC<ExplanationSectionProps> = ({ question, isDark }) => {
  return (
    <div className="mt-6 h-32">
      {question && question.explanation ? (
        <div className="flex flex-col gap-2 h-full">
          <h4 className={`font-bold flex gap-2 items-center text-sm ${isDark ? "text-blue-300" : "text-blue-800"}`}>
            <Icon
              icon={IconifyIcons.robot}
              className="text-2xl"
            />
            AI Explanation
          </h4>
          <p className={`text-md leading-snug overflow-y-auto ${isDark ? "text-gray-200" : "text-slate-600"}`}>{question.explanation}</p>
        </div>
      ) : (
        <div
          className={`px-3 py-2 rounded h-full flex items-center justify-center border-l-4 ${
            isDark ? "bg-gray-700 border-gray-500 text-gray-300" : "bg-gray-50 border-gray-400 text-gray-800"
          }`}
        >
          <p className="italic text-sm">{`No explanation available for this question.`}</p>
        </div>
      )}
    </div>
  );
};

export default ExplanationSection;
