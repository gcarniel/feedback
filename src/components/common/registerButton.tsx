"use client";

import { Feedback } from "@/types/feedback";

interface RegisterButtonProps {
  onSubmit: (feedback: Feedback) => void;
}

const ButtonRegister: React.FC<RegisterButtonProps> = ({ onSubmit }) => {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      type="submit"
    >
      Cadastrar
    </button>
  );
};

export default ButtonRegister;
