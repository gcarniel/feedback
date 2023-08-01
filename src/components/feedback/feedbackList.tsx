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

  return (
    <div className="max-w-4xl mx-auto mb-4 bg-gray-800 rounded-lg shadow-lg p-6 grid gap-4 grid-cols-2">
      <h2 className="text-2xl text-white font-bold col-span-2 mb-4 text-center">
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
      {filteredFeedbacks.map((feedback) => (
        <div
          key={feedback.id}
          className="bg-gray-700 rounded-lg shadow-md p-4 text-white"
        >
          <strong className="text-white mb-2">Título: </strong>
          {feedback.title}
          <br />
          <strong className="text-white mb-2">
            Nome do Colaborador:{" "}
          </strong>{" "}
          {feedback.collaborator?.name || "N/A"}
          <br />
          <strong className="text-white mb-2">Data da Criação: </strong>
          {feedback.registrationDate}
          <br />
          <div className="mt-4 flex justify-center items-center">
            <ButtonEdit onClick={() => handleEditFeedback(feedback.id)} />
            <ButtonPreview onClick={() => handleViewFeedback(feedback.id)} />
            <ButtonDelete onClick={() => handleDeleteFeedback(feedback.id)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedbacksList;
