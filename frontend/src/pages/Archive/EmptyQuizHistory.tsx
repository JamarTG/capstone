import { Icon } from "@mdi/react";
import { mdiHistory } from "@mdi/js";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

const EmptyQuizHistory = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4 text-center">
      <div className="p-6 bg-gray-100 rounded-full">
        <Icon
          path={mdiHistory}
          size={2}
          className="text-gray-400"
        />
      </div>
      <h3 className="text-xl font-medium text-gray-700">No quiz history yet</h3>
      <p className="text-gray-500 max-w-md">Your completed quizzes will appear here. Take your first quiz to get started!</p>
      <Button
        className="mt-4"
        onClick={() => {
          navigate("/quiz");
        }}
      >
        Browse Quizzes
      </Button>
    </div>
  );
};

export default EmptyQuizHistory;
