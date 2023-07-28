"use client";

import React, { useEffect, useState } from "react";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { useRouter } from "next/navigation";

const EditCollaborator = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [collaborator, setCollaborator] = useState<any>(null);

  useEffect(() => {
    const fetchCollaboratorData = async () => {
      try {
        const collaboratorRef = doc(db, "employees", params.id);
        const collaboratorSnapshot = await getDoc(collaboratorRef);
        if (collaboratorSnapshot.exists()) {
          setCollaborator(collaboratorSnapshot.data());
        } else {
          console.error("Collaborator not found.");
        }
      } catch (error) {
        console.error("Error fetching collaborator:", error);
      }
    };

    fetchCollaboratorData();
  }, [params.id]);

  const handleFormSubmit = async (formData: any) => {
    try {
      const collaboratorRef = doc(db, "employees", params.id);
      await updateDoc(collaboratorRef, formData);
      router.push("/colaboratorsList");
    } catch (error) {
      console.error("Error updating collaborator:", error);
    }
  };

  if (!collaborator) {
    return <div>Loading...</div>;
  }

  return (
    <div className="edit-collaborator-container p-4 border rounded-md max-w-6xl mx-auto mt-8">
      <h2 className="text-xl text-center font-bold mb-4">Editar Colaborador</h2>

      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={collaborator.name}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="office">Cargo</label>
          <input
            type="text"
            id="office"
            name="office"
            defaultValue={collaborator.office}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="hiringDate">Data de Contratação</label>
          <input
            type="date"
            id="hiringDate"
            name="hiringDate"
            defaultValue={collaborator.hiringDate}
            required
          />
        </div>
        <button
          className="bg-teal-600 w-32 border rounded-md mb-3 mt-3 font-semibold"
          type="submit"
        >
          Salvar
        </button>
      </form>
    </div>
  );
};

export default EditCollaborator;
