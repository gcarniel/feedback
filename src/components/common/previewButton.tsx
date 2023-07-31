"use client";

import { BsEye } from "react-icons/bs";

interface ButtonPreviewProps {
  onClick: () => void;
}

const ButtonPreview: React.FC<ButtonPreviewProps> = ({ onClick }) => {
  return (
    <button
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-2 rounded flex items-center"
      onClick={onClick}
    >
      <BsEye className="mr-2" />
    </button>
  );
};

export default ButtonPreview;
