import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import type { StatusFilter } from "./types";
import { IconifyIcons } from "../../icons";
import { getFilterMessage } from "@/utils";
import { Icon } from "@iconify/react";
import { useTheme } from "@/hooks";
import type { FC } from "react";

interface NoFilteredQuizzesProps {
  filter: StatusFilter;
}

const NoFilteredQuizzes: FC<NoFilteredQuizzesProps> = ({ filter }) => {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const goToQuizzes = () => {
    navigate("/quiz");
  };
  const { title, description } = getFilterMessage(filter);

  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
      <div
        className={`p-6 rounded-full ${isDark ? "bg-slate-700" : "bg-gray-100"}`}
      >
        <Icon
          icon={IconifyIcons.history}
          className={`${isDark ? "text-gray-300" : "text-gray-400"} text-7xl`}
        />
      </div>
      <h3
        className={`text-xl font-medium ${isDark ? "text-white" : "text-gray-700"}`}
      >
        {title}
      </h3>
      <p className={`max-w-md ${isDark ? "text-gray-400" : "text-gray-500"}`}>
        {description}
      </p>
      {filter === "all" && (
        <Button className="mt-4" onClick={goToQuizzes}>
          Browse Quizzes
        </Button>
      )}
    </div>
  );
};

export default NoFilteredQuizzes;
