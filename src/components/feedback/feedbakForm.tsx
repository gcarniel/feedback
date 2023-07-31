"use client";
import React, { useEffect, useState } from "react";
import { Feedback, Level } from "../../types/feedback";

import { db } from "@/firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  DocumentData,
  DocumentReference,
  updateDoc,
} from "firebase/firestore";

interface FeedbackFormProps {
  onSubmit: (feedback: Feedback) => void;
  mode: "edit" | "view";
  feedbackId: string | null;
  onClose: () => void;
}

const getInitialFormState = (): Feedback => ({
  id: null,
  collaborator: { id: "", name: "" },
  title: "",
  agenda: "",
  leaderPositivePoints: "",
  leaderNegativePoints: "",
  collaboratorPositivePoints: "",
  collaboratorNegativePoints: "",
  feedbackDate: "",
  registrationDate: "",
  levels: [],
});

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Feedback>(getInitialFormState());
  const [fetchedFeedbacks, setFetchedFeedbacks] = useState<Feedback[]>([]);

  const [collaboratorNameInput, setCollaboratorNameInput] =
    useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "feedback"), formData);
      console.log("Document ID:", docRef.id);
      setFormData(getInitialFormState());
      onSubmit(formData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLevelsChange = (
    index: number,
    field: keyof Level,
    value: string
  ) => {
    const updatedLevels = [...formData.levels];
    updatedLevels[index][field] = value;
    setFormData({
      ...formData,
      levels: updatedLevels,
    });
  };

  const handleAddLevel = () => {
    setFormData((prevState) => ({
      ...prevState,
      levels: [
        ...prevState.levels,
        {
          title: "",
          collaboratorLevel: "",
          leaderLevel: "",
          observation: "",
        },
      ],
    }));
  };

  const handleRemoveLevel = (index: number) => {
    const updatedLevels = [...formData.levels];
    updatedLevels.splice(index, 1);
    setFormData({
      ...formData,
      levels: updatedLevels,
    });
  };

  const handleRegistrationDateChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, registrationDate: e.target.value });
  };

  const handleCollaboratorSearch = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "employees"));
      const collaboratorData = querySnapshot.docs.find((doc) => {
        const data = doc.data();
        return data.name === collaboratorNameInput;
      });
      if (collaboratorData) {
        const collaborator = {
          id: collaboratorData.id,
          name: collaboratorData.data().name,
          office: collaboratorData.data().office,
        };
        setFormData((prevData) => ({
          ...prevData,
          collaborator,
        }));
        console.log("colaborador encontrado");
      } else {
        console.log("Colaborador não encontrado!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "feedback"));
        const feedbacks: Feedback[] = querySnapshot.docs.map((doc) => {
          const data = doc.data() as Feedback;
          return { ...data, id: doc.id };
        });
        setFetchedFeedbacks(feedbacks);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFeedbacks();
  }, []);

  return (
    <form
      className="max-w-md mx-auto mb-4  bg-white rounded-lg shadow-lg p-6"
      onSubmit={handleSubmit}
    >
      <div className="mb-2">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="collaboratorName"
        >
          Nome do Colaborador:
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="collaboratorName"
          value={collaboratorNameInput}
          onChange={(e) => setCollaboratorNameInput(e.target.value)}
        />
        <button
          className="mt-2 inline-block bg-blue-500 text-white font-semibold py-1 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleCollaboratorSearch}
        >
          Buscar Colaborador por Nome
        </button>
      </div>

      <div className="mb-2">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Title:
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>

      <div className="mb-2">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="leaderPositivePoints"
        >
          Pontos positivos do líder:
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="leaderPositivePoints"
          value={formData.leaderPositivePoints}
          onChange={(e) =>
            setFormData({ ...formData, leaderPositivePoints: e.target.value })
          }
        />
      </div>

      <div className="mb-2">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="leaderNegativePoints"
        >
          Pontos negativos do líder:
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="leaderNegativePoints"
          value={formData.leaderNegativePoints}
          onChange={(e) =>
            setFormData({ ...formData, leaderNegativePoints: e.target.value })
          }
        />
      </div>

      <div className="mb-2">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="collaboratorPositivePoints"
        >
          Pontos positivos do Colaborador:
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="collaboratorPositivePoints"
          value={formData.collaboratorPositivePoints}
          onChange={(e) =>
            setFormData({
              ...formData,
              collaboratorPositivePoints: e.target.value,
            })
          }
        />
      </div>

      <div className="mb-2">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="collaboratorNegativePoints"
        >
          Pontos negativos do Colaborador:
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          id="collaboratorNegativePoints"
          value={formData.collaboratorNegativePoints}
          onChange={(e) =>
            setFormData({
              ...formData,
              collaboratorNegativePoints: e.target.value,
            })
          }
        />
      </div>

      <div className="mb-2">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="feedbackDate"
        >
          Data que foi feito o feedback:
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="date"
          id="feedbackDate"
          value={formData.feedbackDate}
          onChange={(e) =>
            setFormData({ ...formData, feedbackDate: e.target.value })
          }
        />
      </div>

      <div className="mb-2">
        <h2 className="text-lg font-semibold mb-4">Levels</h2>
        {formData.levels.map((level, index) => (
          <div key={index} className="mb-4">
            <div className="mb-2">
              <label
                className="block text-gray-700 text-sm font-bold"
                htmlFor={`title-${index}`}
              >
                Título Nível
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id={`title-${index}`}
                value={level.title}
                onChange={(e) =>
                  handleLevelsChange(index, "title", e.target.value)
                }
              />
            </div>
            <div className="mb-2">
              <label
                className="block text-gray-700 text-sm font-bold"
                htmlFor={`collaboratorLevel-${index}`}
              >
                Nível de Autopercepção do Colaborador:
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id={`collaboratorLevel-${index}`}
                value={level.collaboratorLevel}
                onChange={(e) =>
                  handleLevelsChange(index, "collaboratorLevel", e.target.value)
                }
              />
            </div>
            <div className="mb-2">
              <label
                className="block text-gray-700 text-sm font-bold"
                htmlFor={`leaderLevel-${index}`}
              >
                Nível atribuído pelo líder:
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                id={`leaderLevel-${index}`}
                value={level.leaderLevel}
                onChange={(e) =>
                  handleLevelsChange(index, "leaderLevel", e.target.value)
                }
              />
            </div>
            <div className="mb-2">
              <label
                className="block text-gray-700 text-sm font-bold"
                htmlFor={`observation-${index}`}
              >
                Observação:
              </label>
              <textarea
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={level.observation}
                onChange={(e) =>
                  handleLevelsChange(index, "observation", e.target.value)
                }
              />
            </div>
            <button
              className="mt-2 inline-block bg-red-500 text-white font-semibold py-1 px-4 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => handleRemoveLevel(index)}
            >
              Remover Nível
            </button>
          </div>
        ))}
        <button
          className="mt-4 inline-block bg-blue-500 text-white font-semibold py-1 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
          type="button"
          onClick={handleAddLevel}
        >
          Adicionar Nível
        </button>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Data de registro do feedback (FIXED):
          <div className="relative">
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="date"
              value={formData.registrationDate}
              onChange={handleRegistrationDateChange} // Use the new change handler
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              ></svg>
            </div>
          </div>
        </label>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Enviar
      </button>
    </form>
  );
};

export default FeedbackForm;
