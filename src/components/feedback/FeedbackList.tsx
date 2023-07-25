"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

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
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "feedback"));
        const feedbacksData: Feedback[] = [];

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
          feedbacksData.push(feedback);
        }

        setFeedbacks(feedbacksData);
      } catch (error) {
        console.log("Error fetching feedbacks:", error);
      }
    };
    fetchFeedbacks();
  }, []);

  const filteredFeedbacks = feedbacks.filter((feedback) =>
    feedback.collaborator?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditFeedback = (feedbackId: string) => {};

  const handleViewFeedback = (feedbackId: string) => {};

  return (
    <div className="max-w-md mx-auto mb-4 bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Lista de Feedbacks</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Pesquisar por nome do colaborador..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-2 w-full text-gray-950"
        />
      </div>
      <ul>
        {filteredFeedbacks.map((feedback) => (
          <li key={feedback.id} className="mb-4 text-slate-950">
            <strong className="text-black mb-2">Título: </strong>
            {feedback.title}
            <br />
            <strong className="text-black mb-2">Nome do Colaborador: </strong>
            {feedback.collaborator?.name || "N/A"}
            <br />
            <strong className="text-black mb-2">Data da Criação: </strong>
            {feedback.registrationDate}
            <br />
            <button
              onClick={() => handleEditFeedback(feedback.id)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Editar
            </button>
            <button
              onClick={() => handleViewFeedback(feedback.id)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Visualizar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbacksList;
