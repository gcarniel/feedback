import React, { useEffect, useState } from "react";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { useRouter } from "next/navigation";

const EditCollaborator = (collaboratorId: any) => {
  console.log("colaborador", collaboratorId);
  const router = useRouter();
  const [collaborator, setCollaborator] = useState<any>(null);
  const [formData, setFormData] = useState<any>({
    name: "",
    office: "",
    hiringDate: "",
  });

  const handleFormSubmit = async (formData: any) => {
    try {
      const collaboratorRef = doc(db, "employees", collaborator?.id);
      console.log("Updating collaborator with ID:", collaborator?.id);
      await updateDoc(collaboratorRef, formData);
      router.push(`/collaboratorForm/${collaborator?.id}`);
    } catch (error) {
      console.error("Error updating collaborator:", error);
    }
  };

  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "employees"));
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                className="border rounded-md px-2 py-1 text-slate-950"
                onChange={handleInputChange}
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
                className="border rounded-md px-2 py-1 text-slate-950"
                onChange={handleInputChange}
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
                className="border rounded-md px-2 py-1 text-slate-950"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <button
                className="bg-teal-600 w-32 border rounded-md mb-3 mt-3 font-semibold text-white py-2"
                type="submit"
              >
                Salvar
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditCollaborator;
