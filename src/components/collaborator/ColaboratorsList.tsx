import React, { useEffect, useState } from "react";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import ColaboradorForm from "@/components/collaborator/ColaboradorForm";

const ColaboratorsList = () => {
  const [collaborators, setCollaborators] = useState<DocumentData[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "employees"));
        const collaboratorsData = querySnapshot.docs.map((doc) => doc.data());
        setCollaborators(collaboratorsData);
      } catch (error) {
        console.error("Error fetching collaborators:", error);
      }
    };

    fetchCollaborators();
  }, []);

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="colaborators-list-container p-4 border rounded-md max-w-6xl mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Lista de Colaboradores</h2>
      <ul>
        {collaborators.map((collaborator) => (
          <li
            key={collaborator.id}
            className="bg-gray-100 p-3 my-2 border rounded-md text-black space-y-2"
          >
            <strong className="font-semibold">Nome: </strong>
            {collaborator.name},
            <strong className="font-semibold text-black">Cargo: </strong>
            {collaborator.office},
            <strong className="font-semibold text-slate-950">
              Data de Contratação:
            </strong>
            {new Date(collaborator.hiringDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
      <button
        className="bg-teal-600 w-32 border rounded-md  mb-3 mt-3 font-semibold"
        onClick={handleShowForm}
      >
        +Novo
      </button>
      {showForm && <ColaboradorForm />}
    </div>
  );
};

export default ColaboratorsList;
