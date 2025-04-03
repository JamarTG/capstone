import React from "react";

interface DeleteAccountProps {
  handleDelete: () => void;
}

const DeleteAccount: React.FC<DeleteAccountProps> = ({ handleDelete }) => {
  return (
    <div className="px-6 py-2 w-full min-w-90 bg-red-600 flex flex-col justify-center bg-white border border-gray-200">
      <h3 className="text-md font-semibold mb-3 text-slate-600">Danger Zone</h3>
      <button
        className="flex justify-start items-center gap-4 w-full"
        onClick={handleDelete}
      >
        <svg viewBox="0 0 24 24" fill="red" width="24" height="24">
          <path d="M9.5 3C9.22386 3 9 3.22386 9 3.5V4H5.5C5.22386 4 5 4.22386 5 4.5V5.5C5 5.77614 5.22386 6 5.5 6H18.5C18.7761 6 19 5.77614 19 5.5V4.5C19 4.22386 18.7761 4 18.5 4H15V3.5C15 3.22386 14.7761 3 14.5 3H9.5ZM6 7.5H18V19.5C18 20.3284 17.3284 21 16.5 21H7.5C6.67157 21 6 20.3284 6 19.5V7.5Z" />
        </svg>
        <p className="text-md text-red-500">Delete Account</p>
      </button>
    </div>
  );
};

export default DeleteAccount;
