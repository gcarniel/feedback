"use client";
import React, { useEffect, useState } from "react";
import { Feedback, Level } from "../../types/feedback";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { db } from "@/firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import ButtonRegister from "../common/registerButton";
import CollaboratorSelect from "../collaborator/collaboratorSearch";
import ButtonSave from "../common/saveButton";

interface FeedbackFormProps {
  onSubmit: (feedback: Feedback) => void;
  feedbackId: string | null;
  onClose: () => void;
}

interface Collaborator {
  id: string;
  name: string;
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

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  onSubmit,
  feedbackId,
}) => {
  const [formData, setFormData] = useState<Feedback>(getInitialFormState());
  const [fetchedFeedbacks, setFetchedFeedbacks] = useState<Feedback[]>([]);
  const [existingFeedbackData, setExistingFeedbackData] =
    useState<Feedback | null>(null);

  const [collaborator, setCollaborator] = useState<Collaborator | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let docRef;

      if (feedbackId) {
        await updateDoc(doc(db, "feedback", feedbackId), formData);
        docRef = feedbackId;
      } else {
        docRef = await addDoc(collection(db, "feedback"), formData);
      }

      console.log("Document ID:", docRef);
      toast.success(
        feedbackId
          ? "Feedback atualizado com sucesso!"
          : "Feedback cadastrado com sucesso!",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );

      if (!feedbackId) {
        setFormData(getInitialFormState());
        setCollaborator(null);
      }

      const mergedFormData = feedbackId
        ? { ...existingFeedbackData, ...formData }
        : formData;

      onSubmit(mergedFormData);
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

  const getFeedbackById = async () => {
    if (!feedbackId) {
      return false;
    }
    const feedbackRef = doc(db, "feedback", feedbackId);
    const feedbackDoc = await getDoc(feedbackRef);
    const feedback = feedbackDoc.exists() ? feedbackDoc?.data() : null;
    if (!feedback) {
      return;
    }
    setFormData({
      id: feedback.id,
      collaborator: {
        id: feedback.collaborator.id,
        name: feedback.collaborator.name,
      },
      title: feedback.title,
      agenda: feedback.agenda,
      leaderPositivePoints: feedback.leaderPositivePoints,
      leaderNegativePoints: feedback.leaderNegativePoints,
      collaboratorPositivePoints: feedback.collaboratorPositivePoints,
      collaboratorNegativePoints: feedback.collaboratorNegativePoints,
      feedbackDate: feedback.feedbackDate,
      registrationDate: feedback.registrationDate,
      levels: [...(feedback as Feedback).levels],
    });
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

  const handleSelectCollaborator = (selectedCollaborator: Collaborator) => {
    try {
      setCollaborator(selectedCollaborator);
      setFormData((prevState) => ({
        ...prevState,
        collaborator: selectedCollaborator,
      }));
      toast.success("Colaborador encontrado!");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao buscar colaborador!");
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

        if (feedbackId) {
          await getFeedbackById();
          setExistingFeedbackData({
            ...formData,
            levels: formData.levels.map((level) => ({ ...level })),
          });
        } else {
          setExistingFeedbackData(null);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchFeedbacks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedbackId]);

  return (
    <div>
      <ToastContainer />
      <form
        className="max-w-xl mx-auto mb-4  bg-white rounded-lg shadow-lg p-6"
        onSubmit={handleSubmit}
      >
        {!feedbackId && (
          <div className="mb-2">
            <CollaboratorSelect
              onSelectCollaborator={handleSelectCollaborator}
            />
          </div>
        )}

        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Nome:
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="name"
            value={formData.collaborator.name}
            onChange={(e) =>
              setFormData({
                ...formData,
                collaborator: {
                  ...formData.collaborator,
                  name: e.target.value,
                },
              })
            }
          />
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
            required
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
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
            required
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
            required
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
            required
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
            required
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
            required
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
                  id={"title"}
                  value={level.title}
                  required
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
                  required
                  onChange={(e) =>
                    handleLevelsChange(
                      index,
                      "collaboratorLevel",
                      e.target.value
                    )
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
                  required
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
                  required
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
                onChange={handleRegistrationDateChange}
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
        {feedbackId ? (
          <ButtonSave onClick={function (): void {}} />
        ) : (
          <ButtonRegister onSubmit={function (feedback: Feedback): void {}} />
        )}
      </form>
    </div>
  );
};

export default FeedbackForm;
