"use client";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

import { useRouter } from "next/navigation";
import ButtonDelete from "../common/deleteButton";
import ButtonEdit from "../common/editButton";
import ButtonPreview from "../common/previewButton";

interface Collaborator {
  id: string;
  name: string;
}

interface Feedback {
  id: string;
  title: string;
  collaborator: Collaborator | null;
  registrationDate: string;
}

const FeedbacksList: React.FC = () => {
  const router = useRouter();

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "feedback"));
        const feedbacks: Feedback[] = [];

        for (const docRef of querySnapshot.docs) {
          const feedback = docRef.data() as Feedback;

          if (feedback.collaborator?.id) {
            try {
              const collaboratorDocRef = doc(
                db,
                "employees",
                feedback.collaborator.id.toString()
              );
              const collaboratorSnapshot = await getDoc(collaboratorDocRef);

              if (collaboratorSnapshot.exists()) {
                const collaboratorData = collaboratorSnapshot.data();
                feedback.collaborator.name = collaboratorData?.name || "N/A";
              } else {
                feedback.collaborator.name = "N/A";
              }
            } catch (error) {
              console.log("Error fetching collaborator:", error);
            }
          }

          feedbacks.push({ ...feedback, id: docRef.id });
        }

        setFeedbacks(feedbacks);
      } catch (error) {
        console.log("Error fetching feedbacks:", error);
      }
    };
    fetchFeedbacks();
  }, []);

  const filteredFeedbacks = feedbacks.filter((feedback) =>
    feedback.collaborator?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditFeedback = (feedbackId: string) => {
    const feedbackToEdit = feedbacks.find(
      (feedback) => feedback.id === feedbackId
    );

    if (feedbackToEdit) {
      setIsFormVisible(true);
      router.push(`/feedbackForm/${feedbackId}`);
      console.log("Editing feedback:", feedbackToEdit);
    } else {
      console.log("Feedback not found with ID:", feedbackId);
    }
  };
  const handleViewFeedback = (feedbackId: string) => {
    const feedbackToView = feedbacks.find(
      (feedback) => feedback.id === feedbackId
    );

    if (feedbackToView) {
      setIsFormVisible(true);
      router.push(`/feedbackForm/${feedbackId}`);
      console.log("Viewing feedback:", feedbackToView);
    } else {
      console.log("Feedback not found with ID:", feedbackId);
    }
  };
  const handleDeleteFeedback = async (feedbackId: string) => {
    try {
      const feedbackDocRef = doc(db, "feedback", feedbackId);
      await deleteDoc(feedbackDocRef);

      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.filter((feedback) => feedback.id !== feedbackId)
      );

      console.log("Feedback deleted successfully!");
    } catch (error) {
      console.log("Error deleting feedback:", error);
    }
  };
  const handleNavigateFeedbackForm = () => {
    router.push("/feedbackForm");
  };

  return (
    <div className="max-w-4xl mx-auto mb-4">
      <h2 className="text-2xl text-white font-bold mb-4 text-center">
        Lista de Feedbacks
      </h2>
      <div className="col-span-2 mb-4">
        <input
          type="text"
          placeholder="Pesquisar por nome do colaborador..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-4 py-2 w-full text-gray-800 bg-gray-200"
        />
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-800 border text-left text-white">
            <th className="p-4">Título</th>
            <th className="p-4">Nome do Colaborador</th>
            <th className="p-4">Data da Criação</th>
            <th className="p-4 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredFeedbacks.map((feedback, index) => (
            <tr
              key={feedback.id}
              className={`bg-gray-700 border text-white ${
                index % 2 === 0 ? "bg-opacity-20" : "bg-opacity-10"
              }`}
            >
              <td className="p-4">{feedback.title}</td>
              <td className="p-4">{feedback.collaborator?.name || "N/A"}</td>
              <td className="p-4">{feedback.registrationDate}</td>
              <td className="p-4 flex justify-center items-center">
                <ButtonEdit onClick={() => handleEditFeedback(feedback.id)} />
                <ButtonPreview
                  onClick={() => handleViewFeedback(feedback.id)}
                />
                <ButtonDelete
                  onClick={() => handleDeleteFeedback(feedback.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="bg-teal-600 w-full sm:w-32 border rounded-md mb-3 mt-3 font-semibold"
        onClick={handleNavigateFeedbackForm}
      >
        +Novo
      </button>
    </div>
  );
};

export default FeedbacksList;
