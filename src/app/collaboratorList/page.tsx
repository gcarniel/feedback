"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

import { useRouter } from "next/navigation";

const ColaboratorsList = () => {
  const router = useRouter();
  const [collaborators, setCollaborators] = useState<DocumentData[]>([]);

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
    router.push("/collaboratorForm");
  };

  const handleEditCollaborator = (collaboratorId: any) => {
    router.push(`/collaboratorForm/${collaboratorId}`);
  };

  return (
    <div className="colaborators-list-container p-4 border rounded-md max-w-6xl mx-auto mt-8">
      <h2 className="text-xl text-center font-bold mb-4">
        Lista de Colaboradores
      </h2>
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left text-slate-950 bg-gray-200 p-3">Nome</th>
            <th className="text-left text-slate-950 bg-gray-200 p-3">Cargo</th>
            <th className="text-left text-slate-950 bg-gray-200 p-3">
              Data de Contratação
            </th>
            <th className="text-left text-slate-950 bg-gray-200 p-3">Ações</th>
          </tr>
        </thead>
        <tbody>
          {collaborators.map((collaborator) => (
            <tr
              key={collaborator.id}
              className="text-white border rounded-md space-y-2"
            >
              <td className="p-3">{collaborator.name}</td>
              <td className="p-3">{collaborator.office}</td>
              <td className="p-3">
                {new Date(collaborator.hiringDate).toLocaleDateString()}
              </td>
              <td className="p-3">
                <button
                  className="bg-teal-600 w-24 border rounded-md font-semibold mr-2"
                  onClick={() => handleEditCollaborator(collaborator.id)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="bg-teal-600 w-32 border rounded-md mb-3 mt-3 font-semibold"
        onClick={handleShowForm}
      >
        +Novo
      </button>
    </div>
  );
};

export default ColaboratorsList;
