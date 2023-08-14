"use client";
import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { useRouter } from "next/navigation";

const EditFeedback = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [feedback, setFeedback] = useState<any>(null);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const feedbackRef = doc(db, "feedbacks", params.id);
        const feedbackSnapshot = await getDoc(feedbackRef);
        console.log("feedbackSnapshot:", feedbackSnapshot.data());
        if (feedbackSnapshot.exists()) {
          setFeedback(feedbackSnapshot.data());
        } else {
          console.error("Feedback not found.");
        }
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    fetchFeedbackData();
  }, [params.id]);

  const handleFormSubmit = async (formData: any) => {
    try {
      const feedbackRef = doc(db, "feedbacks");
      await updateDoc(feedbackRef, formData);
      router.push(`/feedbackForm/${feedback?.id}`);
    } catch (error) {
      console.error("Error updating feedback:", error);
    }
  };

  return (
    <div className="edit-feedback-container p-4 border rounded-md max-w-6xl mx-auto mt-8">
      <h2 className="text-xl text-center font-bold mb-4">Editar Feedback</h2>
      {feedback !== null ? (
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label htmlFor="content" className="block mb-1">
              Conteúdo
            </label>
            <textarea
              id="content"
              name="content"
              defaultValue={feedback.content}
              required
              className="border rounded-md px-2 py-1 text-slate-950"
              rows={4}
              cols={50}
            />
          </div>
          <button
            className="bg-teal-600 w-32 border rounded-md mb-3 mt-3 font-semibold text-white py-2"
            type="submit"
          >
            Salvar
          </button>
        </form>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default EditFeedback;
