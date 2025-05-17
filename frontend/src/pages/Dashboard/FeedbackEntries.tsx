import { Feedback } from "./types";
import { useTheme } from "@/hooks";
import { FC } from "react";

interface FeedbackEntriesProps {
  feedbackEntry: Feedback;
}

const FeedbackEntries: FC<FeedbackEntriesProps> = ({ feedbackEntry }) => {
  const { isDark } = useTheme();
  return (
    <div
      key={feedbackEntry._id}
      className={`border border-gray-700 pl-5 p-2  rounded-md bg-opacity-20 ${
        isDark ? "bg-gray-800 text-gray-200" : "border-slate-300 text-slate-700"
      }`}
    >
      <p className="text-sm leading-relaxed">{feedbackEntry.feedback}</p>
    </div>
  );
};

export default FeedbackEntries;
