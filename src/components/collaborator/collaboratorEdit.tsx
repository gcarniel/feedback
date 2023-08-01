"use client";

import React, { useEffect, useState } from "react";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { useRouter } from "next/navigation";

const EditCollaborator = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [collaborator, setCollaborator] = useState<any>(null);
  const [formData, setFormData] = useState<any>({
    name: "",
    office: "",
    hiringDate: "",
  });
  const [isViewMode, setIsViewMode] = useState<boolean>(false);

  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "employees", params.id)
        );
        const collaboratorsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCollaborator(collaboratorsData);
      } catch (error) {
        console.error("Error fetching collaborators:", error);
      }
    };

    fetchCollaborators();
  }, [params.id]);

  const handleFormSubmit = async (formData: any) => {
    try {
      const collaboratorRef = doc(db, "employees", params.id);

      if (!isViewMode) {
        console.log("Updating collaborator with ID:", params.id);
        await updateDoc(collaboratorRef, formData);
        router.push(`/collaboratorForm/${collaborator?.id}`);
      } else {
        router.push(`/collaboratorForm/${collaborator?.id}`);
      }
    } catch (error) {
      console.error("Error updating collaborator:", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="edit-collaborator-container p-4 border rounded-md max-w-6xl mx-auto mt-8">
      <h2 className="text-xl text-center font-bold mb-4">Editar Colaborador</h2>
      <div className="mt-14 flex justify-center items-center">
        {collaborator && (
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="block mb-1">
                Nome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData?.name || ""}
                required
                className={`border rounded-md px-2 py-1 text-slate-950 ${
                  isViewMode ? "bg-gray-200" : ""
                }`}
                onChange={handleInputChange}
                readOnly={isViewMode}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="office" className="block mb-1">
                Cargo
              </label>
              <input
                type="text"
                id="office"
                name="office"
                value={formData?.office || ""}
                required
                className={`border rounded-md px-2 py-1 text-slate-950 ${
                  isViewMode ? "bg-gray-200" : ""
                }`}
                onChange={handleInputChange}
                readOnly={isViewMode}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="hiringDate" className="block mb-1">
                Data de Contratação
              </label>
              <input
                type="date"
                id="hiringDate"
                name="hiringDate"
                value={formData?.hiringDate || ""}
                required
                className={`border rounded-md px-2 py-1 text-slate-950 ${
                  isViewMode ? "bg-gray-200" : ""
                }`}
                onChange={handleInputChange}
                readOnly={isViewMode}
              />
            </div>
            {!isViewMode && (
              <button
                className="bg-teal-600 w-32 border rounded-md mb-3 mt-3 font-semibold text-white py-2"
                type="submit"
              >
                Salvar
              </button>
            )}
            <button
              className={`bg-gray-500 w-32 border rounded-md mb-3 mt-3 font-semibold text-white py-2 ${
                isViewMode ? "" : "hidden"
              }`}
              type="button"
              onClick={() => setIsViewMode(!isViewMode)}
            >
              {isViewMode ? "Editar" : "Visualizar"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditCollaborator;
