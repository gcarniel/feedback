import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import SaveButton from "../common/saveButton";
import { toast } from "react-toastify";

interface Collaborator {
  id: string;
  name: string;
  office: string;
  hiringDate: string | Date;
}

const EditCollaborator: React.FC<{ collaboratorId: string }> = ({
  collaboratorId,
}) => {
  const router = useRouter();
  const [collaborator, setCollaborator] = useState<any>(null);
  const [formData, setFormData] = useState<Collaborator>({
    id: "",
    name: "",
    office: "",
    hiringDate: "",
  });

  const saveCollaboratorsChanges = async () => {
    console.log("salvei");
    try {
      const { id, name, office, hiringDate } = formData;
      const collaboratorRef = doc(db, "employees", id);
      await updateDoc(collaboratorRef, { name, office, hiringDate });
      router.push(`/collaboratorForm/${id}`);
      toast.success("Colaborador salvo com sucesso!");
    } catch (error) {
      console.error("Error updating collaborator:", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const collaboratorRef = doc(db, "employees", collaboratorId);
        const collaboratorSnapshot = await getDoc(collaboratorRef);
        if (collaboratorSnapshot.exists()) {
          const data = collaboratorSnapshot.data() as Collaborator;
          data.hiringDate = new Date(data.hiringDate);
          setFormData(data);
        }
      } catch (error) {
        console.error("Error fetching collaborator:", error);
      }
    };

    fetchCollaborators();
  }, [collaboratorId]);

  return (
    <div className="edit-collaborator-container p-4 border rounded-md max-w-6xl mx-auto mt-8">
      <h2 className="text-xl text-center font-bold mb-4">Editar Colaborador</h2>
      <div className="mt-14 flex justify-center items-center">
        {!collaborator && (
          <form onSubmit={saveCollaboratorsChanges}>
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
                value={formData.hiringDate as string}
                required
                className="border rounded-md px-2 py-1 text-slate-950"
                onChange={handleInputChange}
              />
            </div>
            <SaveButton onClick={saveCollaboratorsChanges} />
          </form>
        )}
      </div>
    </div>
  );
};

export default EditCollaborator;
