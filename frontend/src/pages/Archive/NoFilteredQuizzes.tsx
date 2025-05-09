import { Icon } from "@mdi/react";
import { MDI_ICONS } from "../../icons";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const NoFilteredQuizzes = ({ filter }: { filter: "all" | "completed" | "incomplete" }) => {
  const navigate = useNavigate();
  const { isDark} = useTheme();


  const getMessage = () => {
    switch (filter) {
      case "completed":
        return {
          title: "No completed quizzes",
          description: "You haven't completed any quizzes yet.",
        };
      case "incomplete":
        return {
          title: "No quizzes in progress",
          description: "You don't have any ongoing quizzes.",
        };
      default:
        return {
          title: "No quiz history yet",
          description: "Your completed quizzes will appear here. Take your first quiz to get started!",
        };
    }
  };

  const goToQuizzes = () => {
    navigate("/quiz");
  }
  const { title, description } = getMessage();

  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
      <div className={`p-6 rounded-full ${isDark ? "bg-slate-700" : "bg-gray-100"}`}>
        <Icon path={MDI_ICONS.history} size={2} className={isDark ? "text-gray-300" : "text-gray-400"} />
      </div>
      <h3 className={`text-xl font-medium ${isDark ? "text-white" : "text-gray-700"}`}>{title}</h3>
      <p className={`max-w-md ${isDark ? "text-gray-400" : "text-gray-500"}`}>{description}</p>
      {filter === "all" && (
        <Button className="mt-4" onClick={goToQuizzes}>
          Browse Quizzes
        </Button>
      )}
    </div>
  );
};

export default NoFilteredQuizzes;
