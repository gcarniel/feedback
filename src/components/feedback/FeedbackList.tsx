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

  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null
  );

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
    <div className="max-w-4xl mx-auto mb-4 bg-white rounded-lg shadow-lg p-6 grid gap-4 grid-cols-2">
      <h2 className="text-xl font-bold col-span-2 mb-4">Lista de Feedbacks</h2>
      <div className="col-span-2 mb-4">
        <input
          type="text"
          placeholder="Pesquisar por nome do colaborador..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-2 w-full text-gray-950"
        />
      </div>
      {filteredFeedbacks.map((feedback) => (
        <div
          key={feedback.id}
          className="bg-white rounded-lg shadow p-4 text-slate-900"
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

          <div className="mt-4">
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedbacksList;
