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
import { BsPencil, BsTrash } from "react-icons/bs";
import { MdContentPaste } from "react-icons/md";

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
        const feedbacks: Feedback[] = querySnapshot.docs.map((doc) => {
          const data = doc.data() as Feedback;
          return { ...data, id: doc.id };
        });

        for (const docRef of querySnapshot.docs) {
          const feedback = docRef.data() as Feedback;
          if (feedback.collaborator?.id) {
            const collaboratorDocRef = doc(
              db,
              "employees",
              feedback.collaborator.id.toString()
            );
            const collaboratorSnapshot = await getDoc(collaboratorDocRef);
            if (collaboratorSnapshot.exists()) {
              const collaboratorData = collaboratorSnapshot.data();
              feedback.collaborator.name = collaboratorData?.name || "N/A";
            }
          }
          feedbacks.push(feedback);
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
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.filter((feedback) => feedback.id !== feedbackId)
      );

      const feedbackDocRef = doc(db, "feedback", feedbackId);
      await deleteDoc(feedbackDocRef);

      console.log("Feedback deleted successfully!");
    } catch (error) {
      console.log("Error deleting feedback:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mb-4 bg-gray-200 rounded-lg shadow-lg p-6 grid gap-4 grid-cols-2">
      <h2 className="text-2xl text-slate-950 font-bold col-span-2 mb-4 text-center">
        Lista de Feedbacks
      </h2>
      <div className="col-span-2 mb-4">
        <input
          type="text"
          placeholder="Pesquisar por nome do colaborador..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-4 py-2 w-full text-gray-800"
        />
      </div>
      {filteredFeedbacks.map((feedback) => (
        <div
          key={feedback.id}
          className="bg-white rounded-lg shadow-md p-4 text-gray-900"
        >
          <strong className="text-black mb-2">Título: </strong>
          {feedback.title}
          <br />
          <strong className="text-black mb-2">Nome do Colaborador: </strong>
          {feedback.collaborator?.name || "N/A"}
          <br />
          <strong className="text-black mb-2">Data da Criação: </strong>
          {feedback.registrationDate}
          <br />

          <div className="mt-4 flex justify-center">
            <button
              onClick={() => handleEditFeedback(feedback.id)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded flex items-center"
            >
              <BsPencil className="mr-2" />
            </button>
            <button
              onClick={() => handleViewFeedback(feedback.id)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mr-2 rounded flex items-center"
            >
              <MdContentPaste className="mr-2" />
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-2 rounded flex items-center"
              onClick={() => handleDeleteFeedback(feedback.id)}
            >
              <BsTrash className="mr-2" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedbacksList;
