import type { Dispatch, SetStateAction,FC } from "react";
import { useState } from "react";
import type { Question } from "../../types/quiz";
import RenderList from "../../components/common/RenderList";
import { Icon } from "@iconify/react";
import { IconifyIcons } from "../../icons";

interface QuestionSidebarProps  {
  questions: Question[];
  isDark: boolean;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: Dispatch<SetStateAction<number>>;
}

const QuestionSidebar:FC<QuestionSidebarProps> = ({
  isDark,
  questions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
}) => {
  const [page, setPage] = useState(0);
  const pageSize = 6;
  const start = page * pageSize;
  const end = start + pageSize;
  const totalPages = Math.ceil(questions.length / pageSize);
  const pageQuestions = questions.slice(start, end);

  const renderPageQuestion = (question: Question, index: number) => {
    const globalIndex = start + index;
    return (
      <li
        key={globalIndex}
        onClick={() => setCurrentQuestionIndex(globalIndex)}
        className={`border p-3 cursor-pointer rounded-lg transition-colors ${
          currentQuestionIndex === globalIndex
            ? `border-white ${isDark ? "text-white bg-gray-700" : "text-gray-800 bg-gray-200"}`
            : `${isDark ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300 text-gray-600 hover:bg-gray-100"}`
        }`}
      >
        <p
          className="truncate"
          title={question.question}
        >
          {globalIndex + 1}. {question.question}
        </p>
      </li>
    );
  };

  return (
    <div className={`w-full sm:w-1/4 lg:w-1/3 p-4 ${isDark ? "bg-gray-800" : ""} rounded-lg sticky top-16 h-full overflow-y-auto`}>
      <h2 className="text-xl text-white mb-6">Questions</h2>
      <ul className="space-y-4">
        <RenderList
          data={pageQuestions}
          renderFn={renderPageQuestion}
        />
      </ul>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          <Icon icon={IconifyIcons.chevronDoubleLeft} className="text-2xl"/>
        </button>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
          disabled={page >= totalPages - 1}
          className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          <Icon icon={IconifyIcons.chevronDoubleRight} className="text-2xl"/>
        </button>
      </div>
    </div>
  );
};

export default QuestionSidebar;
