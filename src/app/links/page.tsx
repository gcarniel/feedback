"use client";
import { useRouter } from "next/navigation";

export default function Nav() {
  const router = useRouter();

  const handleNavigateFeedbacks = () => {
    router.push("/feedbackList");
  };

  const handleNavigateCollaborators = () => {
    router.push("/collaboratorList");
  };

  const handleNavigateFeedbackForm = () => {
    router.push("/feedbackForm");
  };

  return (
    <nav>
      <ul className="flex space-x-4 justify-center items-center">
        <li>
          <button
            onClick={handleNavigateFeedbacks}
            className="text-white hover:text-gray-300 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600"
          >
            Lista de Feedbacks
          </button>
        </li>
        <li>
          <button
            onClick={handleNavigateCollaborators}
            className="text-white hover:text-gray-300 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600"
          >
            Lista de colaboradores
          </button>
        </li>
        <li>
          <button
            onClick={handleNavigateFeedbackForm}
            className="text-white hover:text-gray-300 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600"
          >
            Formulário de Feedback
          </button>
        </li>
      </ul>
    </nav>
  );
}
