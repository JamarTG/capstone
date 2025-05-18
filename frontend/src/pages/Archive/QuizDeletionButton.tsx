import { Icon } from "@iconify/react/dist/iconify.js";
import { IconifyIcons } from "@/icons";
import type { FC } from "react";

interface QuizDeletionButtonProps {
  onDeleteClick: VoidFunction;
  isPending: boolean;
}

const QuizDeletionButton: FC<QuizDeletionButtonProps> = ({
  onDeleteClick,
  isPending,
}) => {
  return (
    <button
      onClick={onDeleteClick}
      disabled={isPending}
      className="cursor-pointer absolute top-3 left-3 z-10 text-white bg-black/30 hover:bg-black/50 p-1.5 rounded-full"
      title="Delete quiz"
    >
      <Icon icon={IconifyIcons.trash} />
    </button>
  );
};

export default QuizDeletionButton;
