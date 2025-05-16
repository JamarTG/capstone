
import ConfirmDeletion from "./ConfirmDeletion";
import {Icon} from "@iconify/react";
import { Section_Map } from "../../constants";
import { IconifyIcons } from "../../icons";

interface Props {
  section: number;
  isConfirming: boolean;
  isPending: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  onDeleteClick: () => void;
}

const QuizCardHeader: React.FC<Props> = ({
  section,
  isConfirming,
  isPending,
  onConfirm,
  onCancel,
  onDeleteClick,
}) => {
  return (
    <section
      className="relative h-32 sm:h-32"
      style={{
        backgroundImage: `url(${Section_Map[section]?.bgSrc})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {!isConfirming ? (
        <button
          onClick={onDeleteClick}
          disabled={isPending}
          className="cursor-pointer absolute top-3 left-3 z-10 text-white bg-black/30 hover:bg-black/50 p-1.5 rounded-full"
          title="Delete quiz"
        >
          <Icon icon={IconifyIcons.trash} />
        </button>
      ) : (
        <ConfirmDeletion onConfirm={onConfirm} onCancel={onCancel} isPending={isPending} />
      )}
    </section>
  );
};

export default QuizCardHeader;
