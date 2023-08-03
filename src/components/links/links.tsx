"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Links() {
  const router = useRouter();

  const handleNavigateFeedbacks = () => {
    router.push("/feedbackList");
  };

  const handleNavigateCollaborators = () => {
    router.push("/collaboratorList");
  };

  return (
    <nav>
      <ul className="flex space-x-4 justify-center items-center">
        <li>
          <button
            onClick={handleNavigateFeedbacks}
            className="text-white hover:text-gray-300 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600"
            style={{ width: "150px" }}
          >
            Feedbacks
          </button>
        </li>
        <li>
          <button
            onClick={handleNavigateCollaborators}
            className="text-white hover:text-gray-300 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600"
            style={{ width: "150px" }}
          >
            Colaboradores
          </button>
        </li>
      </ul>
      <div className="flex justify-center items-center mt-24">
        <Image src="./feedback.svg" width={200} height={200} alt="feedback" />
      </div>
    </nav>
  );
}
