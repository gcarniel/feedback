"use client";
import React, { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import SaveButton from "../common/saveButton";
import { toast } from "react-toastify";

interface EditFeedbackProps {
  feedbackId: string;
  params: {
    id: string;
  };
}

const EditFeedback = ({ feedbackId, params }: EditFeedbackProps) => {
  const router = useRouter();
  const [feedback, setFeedback] = useState<any>(null);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const feedbackRef = doc(db, "feedback", feedbackId);
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
  }, [feedbackId]);

  const saveFeedbackChanges = async () => {
    try {
      if (feedback) {
        const feedbackRef = doc(db, "feedback", feedbackId);
        await updateDoc(feedbackRef, feedback);
        router.push(`/feedbackForm/${params.id}`);
        toast.success("Feedback salvo com sucesso!");
      }
    } catch (error) {
      console.error("Error updating feedback:", error);
    }
  };

  return (
    <div className="edit-feedback-container p-4 border rounded-md max-w-6xl mx-auto mt-8">
      <h2 className="text-xl text-center font-bold mb-4">Editar Feedback</h2>
      {feedback !== null ? (
        <form>
          <div className="mb-3">
            <label htmlFor="content" className="block mb-1">
              Conteúdo
            </label>
            <textarea
              id="content"
              name="content"
              value={feedback.content}
              onChange={(e) =>
                setFeedback({ ...feedback, content: e.target.value })
              }
              required
              className="border rounded-md px-2 py-1 text-slate-950"
              rows={4}
              cols={50}
            />
          </div>
          <SaveButton onClick={saveFeedbackChanges} />
        </form>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default EditFeedback;
