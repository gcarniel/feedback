"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

interface Collaborator {
  id: string;
  name: string;
}

interface CollaboratorSelectProps {
  onSelectCollaborator: (collaborator: Collaborator) => void;
}

const CollaboratorSelect: React.FC<CollaboratorSelectProps> = ({
  onSelectCollaborator,
}) => {
  const [selectedCollaborator, setSelectedCollaborator] =
    useState<Collaborator | null>(null);
  const [fetchedCollaborators, setFetchedCollaborators] = useState<
    Collaborator[]
  >([]);

  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "employees"));
        const collaborators: Collaborator[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
        }));
        setFetchedCollaborators(collaborators);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCollaborators();
  }, []);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const selected = fetchedCollaborators.find(
      (collaborator) => collaborator.id === selectedId
    );
    setSelectedCollaborator(selected || null);
    if (selected) {
      onSelectCollaborator(selected);
    }
  };

  return (
    <div>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="collaboratorSelect"
      >
        Nome do Colaborador:
      </label>
      <select
        id="collaboratorSelect"
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        onChange={handleSelectChange}
        value={selectedCollaborator ? selectedCollaborator.id : ""}
      >
        <option value="">Selecione um colaborador...</option>
        {fetchedCollaborators.map((collaborator) => (
          <option key={collaborator.id} value={collaborator.id}>
            {collaborator.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CollaboratorSelect;
