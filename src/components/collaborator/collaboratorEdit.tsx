import React, { useEffect, useState } from "react";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { useRouter } from "next/navigation";

interface Collaborator {
  id: string;
  name: string;
  office: string;
  hiringDate: string;
}

const EditCollaborator = (collaboratorId: any) => {
  const router = useRouter();
  const [collaborator, setCollaborator] = useState<any>(null);
  const [formData, setFormData] = useState<Collaborator>({
    id: "",
    name: "",
    office: "",
    hiringDate: "",
  });

  const handleFormSubmit = async () => {
    try {
      const { id, name, office, hiringDate } = formData;
      const collaboratorRef = doc(db, "employees");
      console.log("Updating collaborator with ID:");
      await updateDoc(collaboratorRef, { name, office, hiringDate });
      router.push(`/collaboratorForm/${id}`);
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

  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "employees"));
        const collaborators: Collaborator[] = querySnapshot.docs.map((doc) => {
          const data = doc.data() as Collaborator;
          return { ...data, id: doc.id };
        });
        setCollaborator(collaborators);
      } catch (error) {
        console.error("Error fetching collaborators:", error);
      }
    };

    fetchCollaborators();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collaboratorId]);

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
                type="date"
                id="name"
                name="name"
                value={formData.name}
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
                value={formData.office}
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
                value={formData.hiringDate}
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
