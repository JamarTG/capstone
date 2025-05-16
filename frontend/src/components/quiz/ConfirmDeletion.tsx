import type { FC } from "react";

interface ConfirmDeletionProps {
  onConfirm: VoidFunction;
  onCancel: VoidFunction;
  isPending: boolean;
}

const ConfirmDeletion:FC<ConfirmDeletionProps> = ({ onConfirm, onCancel, isPending }) => (
  <div className="absolute inset-0 flex justify-center items-center z-20">
    <div className="p-4 rounded-lg shadow-lg text-center">
      <h2 className="text-lg font-semibold mb-4 text-white">Are you sure you want to delete this quiz?</h2>
      <div className="flex justify-center gap-4">
        <button
          className="text-white"
          onClick={onCancel}
          disabled={isPending}
        >
          Cancel
        </button>
        <button
          className="text-red-600"
          onClick={onConfirm}
          disabled={isPending}
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
);

export default ConfirmDeletion;
