// components/ColaboradoresListAndEdit.tsx
import React, { useState, useEffect } from "react";

interface Colaborator {
  id: number;
  name: string;
  email: string;
  // Other fields you want to edit
}

interface Props {
  collaborators: Colaborator[];
}

const ColaboradoresListAndEdit: React.FC<Props> = ({ collaborators }) => {
  const [selectedCollaborator, setSelectedCollaborator] =
    useState<Colaborator | null>(null);
  const [editedCollaborator, setEditedCollaborator] =
    useState<Colaborator | null>(null);

  useEffect(() => {
    setEditedCollaborator(selectedCollaborator);
  }, [selectedCollaborator]);

  const handleEdit = (collaborator: Colaborator) => {
    setSelectedCollaborator(collaborator);
  };

  const handleCancelEdit = () => {
    setSelectedCollaborator(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editedCollaborator) {
      setEditedCollaborator({
        ...editedCollaborator,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSaveChanges = () => {
    if (editedCollaborator) {
      // Here you can implement the logic to save the changes to the collaborator.
      // For simplicity, we are just updating the collaborator in the local state.
      setSelectedCollaborator(editedCollaborator);
    }
  };

  return (
    <div>
      <h2>Collaborators List</h2>
      <ul>
        {collaborators.map((collaborator) => (
          <li key={collaborator.id}>
            {collaborator.name} - {collaborator.email}
            <button onClick={() => handleEdit(collaborator)}>Edit</button>
          </li>
        ))}
      </ul>

      {selectedCollaborator && (
        <div>
          <h2>Edit Collaborator</h2>
          <p>ID: {selectedCollaborator.id}</p>
          <form>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={editedCollaborator?.name || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Email:
              <input
                type="text"
                name="email"
                value={editedCollaborator?.email || ""}
                onChange={handleChange}
              />
            </label>
            {/* Add other fields you want to allow editing */}
          </form>
          <button onClick={handleCancelEdit}>Cancel</button>
          <button onClick={handleSaveChanges}>Save Changes</button>
        </div>
      )}
    </div>
  );
};

export default ColaboradoresListAndEdit;
