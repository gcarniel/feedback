"use client";

import { BsPencil } from "react-icons/bs";

interface EditButtonProps {
  onClick: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded flex items-center"
      onClick={onClick}
    >
      <BsPencil className="mr-2" />
    </button>
  );
};

export default EditButton;
