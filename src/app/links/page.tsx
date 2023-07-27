"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Link() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleNavigateFeedbacks = () => {
    router.push("/feedbackList");
  };

  const handleNavigateCollaborators = () => {
    router.push("/collaboratorList");
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <nav>
      <ul className="flex space-x-4 justify-end items-end">
        <li>
          <button
            onClick={handleNavigateFeedbacks}
            className="text-white hover:text-gray-300"
          >
            Lista de Feedbacks
          </button>
        </li>
        <li>
          <button
            onClick={handleNavigateCollaborators}
            className="text-white hover:text-gray-300"
          >
            Lista de colaboradores
          </button>
        </li>
      </ul>
    </nav>
  );
}
