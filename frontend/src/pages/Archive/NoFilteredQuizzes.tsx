import { Icon } from "@mdi/react";
import { mdiHistory } from "@mdi/js";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

const NoFilteredQuizzes = ({ filter }: { filter: "all" | "completed" | "incomplete" }) => {

  const navigate = useNavigate();

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

  const { title, description } = getMessage();

  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
      <div className="p-6 bg-gray-100 rounded-full">
        <Icon path={mdiHistory} size={2} className="text-gray-400" />
      </div>
      <h3 className="text-xl font-medium text-gray-700">{title}</h3>
      <p className="text-gray-500 max-w-md">{description}</p>
      {filter === "all" && (
        <Button className="mt-4" onClick={() => navigate("/quiz")}>
          Browse Quizzes
        </Button>
      )}
    </div>
  );
};

export default NoFilteredQuizzes;
