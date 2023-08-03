"use client";
import React from "react";
import { BsTrash } from "react-icons/bs";

interface ButtonDeleteProps {
  onClick: () => void;
}

const ButtonDelete: React.FC<ButtonDeleteProps> = ({ onClick }) => {
  return (
    <button
      className="bg-red-500 hover:bg-red-700  text-white font-bold py-3 px-5 mr-2 rounded flex items-center"
      onClick={onClick}
    >
      <BsTrash className="mr-2" size={18} />
    </button>
  );
};

export default ButtonDelete;
