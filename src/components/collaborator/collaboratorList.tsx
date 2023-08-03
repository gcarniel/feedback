"use client";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  DocumentData,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

import { useRouter } from "next/navigation";
import ButtonDelete from "../common/deleteButton";
import ButtonEdit from "../common/editButton";
import ButtonPreview from "../common/previewButton";

const ColaboratorsList = () => {
  const router = useRouter();
  const [collaborators, setCollaborators] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "employees"));
        const collaboratorsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
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

  const handleEditCollaborator = (collaboratorId: string) => {
    router.push(`/collaboratorForm/${collaboratorId}`);
  };

  const handleViewCollaborator = (collaboratorId: string) => {
    router.push(`/collaboratorForm/${collaboratorId}`);
  };

  const handleDeleteCollaborator = async (collaboratorId: string) => {
    try {
      setCollaborators((prevCollaborators) =>
        prevCollaborators.filter(
          (collaborator) => collaborator.id !== collaboratorId
        )
      );

      const collaboratorDocRef = doc(db, "employees", collaboratorId);
      await deleteDoc(collaboratorDocRef);

      console.log("Collaborator deleted successfully!");
    } catch (error) {
      console.log("Error deleting collaborator:", error);
    }
  };

  return (
    <div className="colaborators-list-container p-4 border rounded-md max-w-6xl mx-auto mt-8">
      <h2 className="text-xl text-center font-bold mb-4">
        Lista de Colaboradores
      </h2>
      <div className="table-responsive overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left text-slate-950 bg-gray-200 p-3 w-1/4 sm:w-1/3 md:w-1/4">
                Nome
              </th>
              <th className="text-left text-slate-950 bg-gray-200 p-3 w-1/4 sm:w-1/3 md:w-1/4">
                Cargo
              </th>
              <th className="text-left text-slate-950 bg-gray-200 p-3 w-1/4 sm:w-1/3 md:w-1/4">
                Data de Contratação
              </th>
              <th className="text-left text-slate-950 bg-gray-200 p-3 w-1/4 sm:w-1/3 md:w-1/4">
                Ações
              </th>
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
                  <div className="flex items-center justify-center">
                    <ButtonEdit
                      onClick={() => handleEditCollaborator(collaborator.id)}
                    />
                    <ButtonPreview
                      onClick={() => handleViewCollaborator(collaborator.id)}
                    />
                    <ButtonDelete
                      onClick={() => handleDeleteCollaborator(collaborator.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
