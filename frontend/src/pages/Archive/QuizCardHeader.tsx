import QuizDeletionPrompt from "./QuizDeletionPrompt";
import QuizDeletionButton from "./QuizDeletionButton";
import { Section_Map } from "../../constants";
import { IconifyIcons } from "../../icons";
import { Icon } from "@iconify/react";
import type { FC } from "react";

interface Props {
  section: number;
  isConfirming: boolean;
  isPending: boolean;
  onConfirm: VoidFunction;
  onCancel: VoidFunction;
  onDeleteClick: VoidFunction;
}

const QuizCardHeader: FC<Props> = ({
  section,
  isConfirming,
  isPending,
  onConfirm,
  onCancel,
  onDeleteClick,
}) => {
  return (
    <section
      className="relative h-32 bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${Section_Map[section]?.bgSrc})` }}
    >
      {!isConfirming ? (
        <QuizDeletionButton onDeleteClick={onDeleteClick} isPending={false} />
      ) : (
        <QuizDeletionPrompt
          onConfirm={onConfirm}
          onCancel={onCancel}
          isPending={isPending}
        />
      )}
    </section>
  );
};

export default QuizCardHeader;
